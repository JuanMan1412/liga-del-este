import { useState } from "react";
import { useCampeonato } from "../hooks/useCampeonato";
import Hero from "../components/sections/Hero.jsx";
import CategoriaTabs from "../components/sections/CategoriaTabs.jsx";
import VistaTabs from "../components/sections/VistaTabs.jsx";
import Posiciones from "../components/sections/Posiciones.jsx";
import Partidos from "../components/sections/Partidos.jsx";
import Goleadores from "../components/sections/Goleadores.jsx";
import Amonestados from "../components/sections/Amonestados.jsx";
import SponsorsCampeonato from "../components/sections/SponsorsCampeonato.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";
import "./Home.css";

export default function Home() {
  const c = useCampeonato();
  const [vista, setVista] = useState("posiciones");
  const listo = !c.cargando && !c.error;

  return (
    <>
      <Hero />
      <div className="container">
        {c.cargando && <div className="block"><EmptyState>Cargando resultados...</EmptyState></div>}
        {c.error && <div className="block"><EmptyState>{c.error}</EmptyState></div>}

        {listo && (
          <>
            <div className="controls">
              <CategoriaTabs categorias={c.categorias} activa={c.catId} onElegir={c.setCatId} />
              <VistaTabs activa={vista} onElegir={setVista} />
            </div>

            <div className="layout">
              <div id="panel-vista" role="tabpanel" aria-labelledby={`tab-${vista}`}>
                {vista === "posiciones" && <Posiciones tablas={c.tablas} />}
                {vista === "fixture" && <Partidos key={c.catId} partidos={c.partidos} fechas={c.fechas} />}
                {vista === "goleadores" && <Goleadores goleadores={c.goleadores} />}
                {vista === "amonestados" && <Amonestados tarjetas={c.tarjetas} suspendidos={c.suspendidos} />}
              </div>
              <aside>
                <SponsorsCampeonato sponsors={c.sponsors} />
              </aside>
            </div>
          </>
        )}
      </div>
    </>
  );
}
