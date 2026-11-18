import { CAMPEONATO } from "../../config/campeonato";
import "./Footer.css";

export default function Footer() {
  const dev = CAMPEONATO.desarrollador;
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__name">{CAMPEONATO.nombre}. {CAMPEONATO.lema}.</p>
        <p className="footer__legal">
          © {new Date().getFullYear()}. Sitio desarrollado por{" "}
          <a href={`https://wa.me/${dev.whatsapp}`} target="_blank" rel="noreferrer">{dev.nombre}</a>
        </p>
      </div>
    </footer>
  );
}
