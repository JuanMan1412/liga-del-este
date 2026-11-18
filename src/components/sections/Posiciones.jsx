import SectionTitle from "../ui/SectionTitle.jsx";
import EmptyState from "../ui/EmptyState.jsx";
import "./Posiciones.css";

export default function Posiciones({ tablas }) {
  const hayDatos = tablas.some((t) => t.filas.length > 0);
  return (
    <section>
      <SectionTitle>Tabla de posiciones</SectionTitle>
      {!hayDatos ? (
        <EmptyState>Todavía no se cargaron equipos en esta categoría.</EmptyState>
      ) : (
        tablas.map(({ zona, filas }) => (
          <div key={zona || "unica"} className="pos__group">
            {zona && <h3 className="pos__zona">{zona}</h3>}
            <div className="pos">
              <table className="pos__table">
                <thead>
                  <tr>
                    <th>#</th><th className="pos__team">Equipo</th>
                    <th>PJ</th><th>G</th><th>E</th><th>P</th>
                    <th className="pos__extra">GF</th><th className="pos__extra">GC</th><th>DG</th><th>Pts</th>
                  </tr>
                </thead>
                <tbody>
                  {filas.map((f, i) => (
                    <tr key={f.equipo} className={i === 0 ? "pos__lider" : ""}>
                      <td>{i + 1}</td>
                      <td className="pos__team">{f.equipo}</td>
                      <td>{f.pj}</td><td>{f.g}</td><td>{f.e}</td><td>{f.p}</td>
                      <td className="pos__extra">{f.gf}</td><td className="pos__extra">{f.gc}</td>
                      <td>{f.dif > 0 ? `+${f.dif}` : f.dif}</td>
                      <td className="pos__pts">{f.pts}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </section>
  );
}
