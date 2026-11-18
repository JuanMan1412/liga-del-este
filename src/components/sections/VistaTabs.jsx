import "./VistaTabs.css";

export const VISTAS = [
  { id: "posiciones", label: "Posiciones" },
  { id: "fixture", label: "Fixture y resultados" },
  { id: "goleadores", label: "Goleadores" },
  { id: "amonestados", label: "Amonestados" },
];

export default function VistaTabs({ activa, onElegir }) {
  return (
    <div className="vistas" role="tablist" aria-label="Secciones del campeonato">
      {VISTAS.map((v) => (
        <button
          key={v.id} type="button" role="tab" id={`tab-${v.id}`} className="vistas__btn"
          aria-selected={v.id === activa} aria-controls="panel-vista" onClick={() => onElegir(v.id)}
        >
          {v.label}
        </button>
      ))}
    </div>
  );
}
