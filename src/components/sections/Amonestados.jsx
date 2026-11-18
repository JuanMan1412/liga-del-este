import SectionTitle from "../ui/SectionTitle.jsx";
import EmptyState from "../ui/EmptyState.jsx";
import "./Amonestados.css";

export default function Amonestados({ tarjetas, suspendidos }) {
  return (
    <section>
      <SectionTitle>Tarjetas acumuladas</SectionTitle>
      {tarjetas.length === 0 ? (
        <EmptyState>Todavía no hay tarjetas cargadas en esta categoría.</EmptyState>
      ) : (
        <div className="amo">
          <table className="amo__table">
            <thead>
              <tr><th className="amo__who">Jugador</th><th>Amarillas</th><th>Rojas</th></tr>
            </thead>
            <tbody>
              {tarjetas.map((t) => (
                <tr key={`${t.jugador}-${t.equipo}`}>
                  <td className="amo__who"><strong>{t.jugador}</strong><small>{t.equipo}</small></td>
                  <td><span className="amo__chip amo__chip--y">{t.amarillas}</span></td>
                  <td><span className="amo__chip amo__chip--r">{t.rojas}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="amo__gap" />
      <SectionTitle>Suspendidos</SectionTitle>
      {suspendidos.length === 0 ? (
        <EmptyState>No hay jugadores suspendidos.</EmptyState>
      ) : (
        <ul className="susp">
          {suspendidos.map((s, i) => (
            <li key={i} className="susp__item">
              <strong>{s.jugador}</strong>
              <small>{s.equipo}</small>
              <span>
                Fecha {s.fecha}: {s.suspension} {s.suspension === 1 ? "fecha" : "fechas"} de suspensión
                {s.obs ? `. ${s.obs}` : ""}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
