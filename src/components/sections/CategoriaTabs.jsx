import "./CategoriaTabs.css";

export default function CategoriaTabs({ categorias, activa, onElegir }) {
  return (
    <div className="cats" role="group" aria-label="Categoría">
      {categorias.map((c) => (
        <button key={c.id} type="button" className="cats__btn" aria-pressed={c.id === activa} onClick={() => onElegir(c.id)}>
          {c.nombre}
        </button>
      ))}
    </div>
  );
}
