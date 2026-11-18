// Tabla de posiciones calculada con los partidos jugados.
// "ajustes" suma lo jugado en fechas que no están cargadas en "partidos".
export function calcularTabla(partidos, ajustes = []) {
  const t = {};
  const fila = (n) => (t[n] ??= { equipo: n, pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 });
  partidos.forEach((x) => { fila(x.local); fila(x.visitante); });
  partidos.filter((x) => x.jugado).forEach((x) => {
    const L = fila(x.local), V = fila(x.visitante);
    L.pj++; V.pj++;
    L.gf += x.gl; L.gc += x.gv; V.gf += x.gv; V.gc += x.gl;
    if (x.gl > x.gv) { L.g++; L.pts += 3; V.p++; }
    else if (x.gl < x.gv) { V.g++; V.pts += 3; L.p++; }
    else { L.e++; V.e++; L.pts++; V.pts++; }
  });
  ajustes.forEach((a) => {
    const f = fila(a.equipo);
    f.pj += a.pj; f.g += a.g; f.e += a.e; f.p += a.p; f.gf += a.gf; f.gc += a.gc;
    f.pts += a.g * 3 + a.e;
  });
  return Object.values(t)
    .map((f) => ({ ...f, dif: f.gf - f.gc }))
    .sort((a, b) => b.pts - a.pts || b.dif - a.dif || b.gf - a.gf || a.equipo.localeCompare(b.equipo));
}
