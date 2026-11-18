// Tarjetas acumuladas por jugador y lista de suspendidos.
export function calcularTarjetas(sanciones) {
  const m = {};
  sanciones.forEach((x) => {
    const k = `${x.jugador}|${x.equipo}`;
    m[k] ??= { jugador: x.jugador, equipo: x.equipo, amarillas: 0, rojas: 0 };
    if (x.tarjeta === "amarilla") m[k].amarillas++;
    if (x.tarjeta === "roja") m[k].rojas++;
  });
  const tarjetas = Object.values(m).sort(
    (a, b) => b.rojas - a.rojas || b.amarillas - a.amarillas || a.jugador.localeCompare(b.jugador)
  );
  const suspendidos = sanciones.filter((x) => x.suspension > 0).sort((a, b) => b.fecha - a.fecha);
  return { tarjetas, suspendidos };
}
