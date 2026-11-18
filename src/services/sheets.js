import Papa from "papaparse";
import { DEMO } from "../data/demo";

const cache = new Map();
const VACIO = { partidos: [], goles: [], sanciones: [], ajustes: [] };

// Descarga una pestaña publicada como CSV (sin interpretar títulos todavía).
function leerCSV(url) {
  if (!cache.has(url)) {
    const promesa = new Promise((resolve, reject) => {
      Papa.parse(url, {
        download: true, header: false, skipEmptyLines: "greedy",
        complete: (res) => resolve(res.data),
        error: reject,
      });
    }).catch((e) => { cache.delete(url); throw e; });
    cache.set(url, promesa);
  }
  return cache.get(url);
}

const texto = (v) => (v ?? "").toString().trim();
const numero = (v) => (texto(v) === "" || Number.isNaN(Number(v)) ? null : Number(v));
export const slug = (s) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9+]+/g, "-");

// Pestaña simple (por ejemplo "sponsors"): la primera fila son los títulos.
function tablaSimple(filas) {
  const [titulos = [], ...datos] = filas;
  const keys = titulos.map((t) => texto(t).toLowerCase());
  return datos.map((f) => Object.fromEntries(keys.map((k, i) => [k, f[i]]).filter(([k]) => k)));
}

// Pestaña de categoría con bloques uno al lado del otro.
// Fila 1 = nombre del bloque (PARTIDOS, GOLES, SANCIONES, AJUSTES, EQUIPOS), fila 2 = títulos de columnas.
export function leerBloques(filas) {
  const [titulos = [], nombres = [], ...datos] = filas;
  let grupo = "";
  const cols = nombres.map((n, i) => {
    if (texto(titulos[i])) grupo = texto(titulos[i]).toLowerCase();
    return { grupo, nombre: texto(n).toLowerCase() };
  });
  const out = { partidos: [], goles: [], sanciones: [], ajustes: [] };
  datos.forEach((fila) => {
    const por = {};
    cols.forEach((c, i) => {
      if (c.nombre && texto(fila[i]) !== "") (por[c.grupo] ??= {})[c.nombre] = fila[i];
    });
    Object.keys(out).forEach((k) => { if (por[k]) out[k].push(por[k]); });
  });
  return out;
}

// Convierte los bloques de UNA categoría al formato que usa la web.
export function parsearCategoria(b, nombre) {
  const cat = slug(nombre);
  return {
    partidos: b.partidos
      .filter((r) => texto(r.local) && texto(r.visitante))
      .map((r, i) => {
        const gl = numero(r.goles_local), gv = numero(r.goles_visitante);
        return {
          id: `${cat}-${i}`, fecha: Number(r.fecha) || 0, cat, catNombre: nombre, zona: texto(r.zona),
          local: texto(r.local), visitante: texto(r.visitante),
          jugado: gl !== null && gv !== null, gl, gv,
          cuando: texto(r.dia_hora), sede: texto(r.sede),
        };
      }),
    goles: b.goles
      .filter((r) => texto(r.jugador))
      .map((r) => ({ cat, equipo: texto(r.equipo), jugador: texto(r.jugador), cantidad: numero(r.goles) ?? 1 })),
    ajustes: b.ajustes
      .filter((r) => texto(r.equipo))
      .map((r) => ({
        cat, zona: texto(r.zona), equipo: texto(r.equipo),
        pj: numero(r.pj) ?? 0, g: numero(r.g) ?? 0, e: numero(r.e) ?? 0, p: numero(r.p) ?? 0,
        gf: numero(r.gf) ?? 0, gc: numero(r.gc) ?? 0,
      })),
    sanciones: b.sanciones
      .filter((r) => texto(r.jugador))
      .map((r) => {
        const t = texto(r.tarjeta).toLowerCase();
        return {
          cat, fecha: Number(r.fecha) || 0, equipo: texto(r.equipo), jugador: texto(r.jugador),
          tarjeta: t.startsWith("roj") ? "roja" : t.startsWith("amar") ? "amarilla" : "",
          suspension: numero(r.fechas_suspension) ?? 0, obs: texto(r.observaciones),
        };
      }),
  };
}

// Devuelve todo lo que necesita la pantalla.
export async function cargarCampeonato(c) {
  const conUrl = c.categorias.filter((x) => x.url);
  const demo = conUrl.length === 0;
  const lista = demo ? c.categorias : conUrl;

  const [bloques, rowsS] = await Promise.all([
    Promise.all(lista.map(async (x) => (demo ? DEMO[x.nombre] ?? VACIO : leerBloques(await leerCSV(x.url))))),
    c.sponsorsUrl ? leerCSV(c.sponsorsUrl) : null,
  ]);

  const data = { partidos: [], goles: [], ajustes: [], sanciones: [], categorias: [] };
  lista.forEach((x, i) => {
    const r = parsearCategoria(bloques[i], x.nombre);
    data.categorias.push({ id: slug(x.nombre), nombre: x.nombre });
    ["partidos", "goles", "ajustes", "sanciones"].forEach((k) => data[k].push(...r[k]));
  });

  data.sponsors = rowsS
    ? tablaSimple(rowsS).filter((r) => texto(r.nombre)).map((r, i) => ({ id: i, nombre: texto(r.nombre), rubro: texto(r.rubro) }))
    : c.sponsors ?? [];
  return data;
}
