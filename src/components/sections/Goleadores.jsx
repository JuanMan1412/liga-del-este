import SectionTitle from "../ui/SectionTitle.jsx";
import EmptyState from "../ui/EmptyState.jsx";
import "./Goleadores.css";

export default function Goleadores({ goleadores }) {
  const top = goleadores.slice(0, 15);
  return (
    <section>
      <SectionTitle>Tabla de goleadores</SectionTitle>
      {top.length === 0 ? (
        <EmptyState>Todavía no hay goles cargados en esta categoría.</EmptyState>
      ) : (
        <ol className="gol">
          {top.map((g, i) => (
            <li key={`${g.jugador}-${g.equipo}`} className="gol__row">
              <span className="gol__pos">{i + 1}</span>
              <span className="gol__who"><strong>{g.jugador}</strong><small>{g.equipo}</small></span>
              <span className="gol__n">{g.goles}</span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
