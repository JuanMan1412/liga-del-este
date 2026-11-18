import "./MatchRow.css";

export default function MatchRow({ partido }) {
  const { local, visitante, jugado, gl, gv, cuando, sede } = partido;
  const detalle = [cuando, sede].filter(Boolean).join(" - ");
  return (
    <li className="match">
      <span className="match__team match__team--local">{local}</span>
      <span className={`match__score ${jugado ? "" : "match__score--pending"}`}>{jugado ? `${gl} - ${gv}` : "vs"}</span>
      <span className="match__team">{visitante}</span>
      {detalle && <span className="match__when">{detalle}</span>}
    </li>
  );
}
