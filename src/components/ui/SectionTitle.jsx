import "./SectionTitle.css";

export default function SectionTitle({ children, aside }) {
  return (
    <div className="stitle">
      <h2 className="stitle__text">{children}</h2>
      {aside && <span className="stitle__aside">{aside}</span>}
    </div>
  );
}
