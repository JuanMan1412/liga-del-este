// ============================================================
//  CONFIGURACIÓN DEL CAMPEONATO (lo único que hay que tocar)
//  Cada categoría es una PESTAÑA de la planilla de Google Sheets.
//  Para cada una: Archivo > Compartir > Publicar en la web > (elegir la pestaña) > CSV,
//  y pegar el link en "url". Las categorías sin link no se muestran.
//  Si ninguna tiene link, se ven datos de ejemplo.
// ============================================================
export const CAMPEONATO = {
  nombre: "Liga del Este",
  lema: "Fútbol amateur de la zona este",
  temporada: "2026",
  contacto: "5493813045005", // WhatsApp del organizador (con código de país, sin + ni espacios)
  logo: "/logo.jpg",
  logoIcono: "/logo-icono.png",
  
  // Quién desarrolla el sitio (aparece en el pie de página)
  desarrollador: { nombre: "Juan Manuel", whatsapp: "5493816425048" },

  // Las categorías aparecen en este orden. "nombre" es el que se ve en la web.
  categorias: [
    { nombre: "Libre", url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSgVyx4BprPypZAUCZUt4KQDo5QIRZtnjDnRvpUT7AZReOLx2R8A-1XegTdE5sw72hXNhQYD72gkz-a/pub?gid=2099576385&single=true&output=csv" },
    { nombre: "+30", url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSgVyx4BprPypZAUCZUt4KQDo5QIRZtnjDnRvpUT7AZReOLx2R8A-1XegTdE5sw72hXNhQYD72gkz-a/pub?gid=1243213530&single=true&output=csv" },
    { nombre: "+40", url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSgVyx4BprPypZAUCZUt4KQDo5QIRZtnjDnRvpUT7AZReOLx2R8A-1XegTdE5sw72hXNhQYD72gkz-a/pub?gid=2137804373&single=true&output=csv" },
    { nombre: "+45", url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQIJyL8ClsdL-igY_kRZ2QmOnDtwLCZwwg7-RIu_SkyUMgHOh5UD6V5-3WiSZaJuAZG5MEi7Y8YwI5U/pub?gid=1045632645&single=true&output=csv" },
    { nombre: "Femenino", url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSgVyx4BprPypZAUCZUt4KQDo5QIRZtnjDnRvpUT7AZReOLx2R8A-1XegTdE5sw72hXNhQYD72gkz-a/pub?gid=612084667&single=true&output=csv" },
  ],

  sponsorsUrl: "", // opcional: pestaña "sponsors" publicada como CSV

  // Si no usás la pestaña "sponsors", podés escribirlos acá:
  sponsors: [
    { id: "c1", nombre: "Ferretería Central", rubro: "Ferretería" },
    { id: "c2", nombre: "Gomería El Rápido", rubro: "Gomería" },
  ],
};
