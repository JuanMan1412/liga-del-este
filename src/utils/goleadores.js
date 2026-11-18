// Suma los goles por jugador (cada fila puede traer varios goles).
export function calcularGoleadores(goles) {
  const m = {};
  goles.forEach(({ jugador, equipo, cantidad = 1 }) => {
    const k = `${jugador}|${equipo}`;
    m[k] ??= { jugador, equipo, goles: 0 };
    m[k].goles += cantidad;
  });
  return Object.values(m).sort((a, b) => b.goles - a.goles || a.jugador.localeCompare(b.jugador));
}
