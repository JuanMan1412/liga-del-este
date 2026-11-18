import SectionTitle from "../ui/SectionTitle.jsx";
import "./SponsorsCampeonato.css";

export default function SponsorsCampeonato({ sponsors }) {
  if (!sponsors.length) return null;
  return (
    <section>
      <SectionTitle>Sponsors oficiales</SectionTitle>
      <ul className="sp">
        {sponsors.map((s) => (
          <li key={s.id} className="sp__item">
            <span className="sp__mark" aria-hidden="true">{s.nombre[0]}</span>
            <span><strong>{s.nombre}</strong><small>{s.rubro}</small></span>
          </li>
        ))}
      </ul>
    </section>
  );
}
