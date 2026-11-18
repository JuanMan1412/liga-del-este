import { useEffect, useMemo, useState } from "react";
import { CAMPEONATO } from "../config/campeonato";
import { cargarCampeonato } from "../services/sheets";
import { calcularTabla } from "../utils/tabla";
import { calcularGoleadores } from "../utils/goleadores";
import { calcularTarjetas } from "../utils/tarjetas";

export function useCampeonato() {
  const [catId, setCatId] = useState(null);
  const [estado, setEstado] = useState({ cargando: true, error: null, data: null });

  useEffect(() => {
    let vivo = true;
    cargarCampeonato(CAMPEONATO)
      .then((data) => {
        if (!vivo) return;
        setEstado({ cargando: false, error: null, data });
        // arranca en la primera categoría que tenga partidos cargados
        const conDatos = data.categorias.find((c) => data.partidos.some((x) => x.cat === c.id));
        setCatId((conDatos ?? data.categorias[0])?.id ?? null);
      })
      .catch(() => {
        if (vivo) setEstado({
          cargando: false, data: null,
          error: "No se pudo leer la planilla. Revisá que cada pestaña esté publicada como CSV y que su link esté pegado en la categoría correcta.",
        });
      });
    return () => { vivo = false; };
  }, []);

  const data = estado.data;
  const derivados = useMemo(() => {
    if (!data) return { partidos: [], fechas: [], tablas: [], goleadores: [], tarjetas: [], suspendidos: [] };
    const partidos = data.partidos.filter((x) => x.cat === catId);
    const zonas = [...new Set(partidos.map((x) => x.zona))];
    return {
      partidos,
      fechas: [...new Set(partidos.map((x) => x.fecha))].sort((a, b) => a - b),
      tablas: zonas.map((z) => ({
        zona: z,
        filas: calcularTabla(
          partidos.filter((x) => x.zona === z),
          data.ajustes.filter((a) => a.cat === catId && a.zona === z)
        ),
      })),
      goleadores: calcularGoleadores(data.goles.filter((x) => x.cat === catId)),
      ...calcularTarjetas(data.sanciones.filter((x) => x.cat === catId)),
    };
  }, [data, catId]);

  return {
    catId, setCatId,
    cargando: estado.cargando, error: estado.error,
    categorias: data?.categorias ?? [],
    sponsors: data?.sponsors ?? [],
    ...derivados,
  };
}