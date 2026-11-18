import { CAMPEONATO } from "../../config/campeonato";
import "./Header.css";

export default function Header() {
  return (
    <header className="header" id="top">
      <div className="container header__inner">
        <a className="header__brand" href="#top">
          <img className="header__logo" src={CAMPEONATO.logoIcono} alt="" />
          <span className="header__name">{CAMPEONATO.nombre}</span>
        </a>
        <a className="header__cta" href={`https://wa.me/${CAMPEONATO.contacto}`} target="_blank" rel="noreferrer">
          Contacto
        </a>
      </div>
    </header>
  );
}