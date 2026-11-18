import { useState } from "react";
import SectionTitle from "../ui/SectionTitle.jsx";
import EmptyState from "../ui/EmptyState.jsx";
import MatchRow from "../ui/MatchRow.jsx";
import "./Partidos.css";

// Fixture y resultados por fecha. Arranca en la próxima fecha pendiente
// (o en la última, si ya se jugó todo). Usar key={categoria} para reiniciar.
export default function Partidos({ partidos, fechas }) {
  const inicial = fechas.find((f) => partidos.some((p) => p.fecha === f && !p.jugado)) ?? fechas[fechas.length - 1];
  const [fecha, setFecha] = useState(inicial);
  const delaFecha = partidos.filter((p) => p.fecha === fecha);

  return (
    <section>
      <SectionTitle aside={fechas.length ? `Fecha ${fecha}` : ""}>Fixture y resultados</SectionTitle>
      {fechas.length === 0 ? (
        <EmptyState>Todavía no hay partidos cargados.</EmptyState>
      ) : (
        <>
          <div className="fechas" role="group" aria-label="Fecha">
            {fechas.map((f) => (
              <button key={f} type="button" className="fechas__btn" aria-pressed={f === fecha} onClick={() => setFecha(f)}>
                {f}
              </button>
            ))}
          </div>
          <ul className="matches">{delaFecha.map((m) => <MatchRow key={m.id} partido={m} />)}</ul>
        </>
      )}
    </section>
  );
}
