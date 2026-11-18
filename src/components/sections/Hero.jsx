import { CAMPEONATO } from "../../config/campeonato";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="hero__season">Temporada {CAMPEONATO.temporada}</p>
          <h1 className="hero__title">{CAMPEONATO.nombre}</h1>
          <p className="hero__text">Posiciones, fixture, goleadores y amonestados de todas las categorías, siempre al día.</p>
        </div>
        <img className="hero__logo" src={CAMPEONATO.logo} alt={`Logo de ${CAMPEONATO.nombre}`} />
      </div>
    </section>
  );
}