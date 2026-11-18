// Datos de ejemplo por categoría, con el MISMO formato que los bloques de cada pestaña.
const p = (fecha, local, visitante, gl = "", gv = "", dia_hora = "", sede = "") =>
  ({ fecha, local, visitante, goles_local: gl, goles_visitante: gv, dia_hora, sede });
const g = (fecha, equipo, jugador, goles = 1) => ({ fecha, equipo, jugador, goles });
const s = (fecha, equipo, jugador, tarjeta, fechas_suspension = "", observaciones = "") =>
  ({ fecha, equipo, jugador, tarjeta, fechas_suspension, observaciones });

export const DEMO = {
  "+40": {
    partidos: [
      p(1, "Los Aromos", "Sporting Este", 2, 1, "16:00 hs", "Colonia Uno"),
      p(1, "Atlético Cebil", "Unión del Este", 0, 0, "17:30 hs", "San Justo"),
      p(1, "Villa Norte", "Defensores Sur", 3, 2, "16:00 hs", "Juan Posse"),
      p(2, "Sporting Este", "Atlético Cebil", 1, 0),
      p(2, "Unión del Este", "Villa Norte", 2, 2),
      p(2, "Defensores Sur", "Los Aromos", 0, 3),
      p(3, "Los Aromos", "Atlético Cebil", "", "", "Sáb 16:00 hs", "Colonia Uno"),
      p(3, "Sporting Este", "Villa Norte", "", "", "Sáb 17:30 hs", "San Justo"),
      p(3, "Unión del Este", "Defensores Sur", "", "", "Dom 10:00 hs", "Juan Posse"),
    ],
    goles: [
      g(1, "Los Aromos", "Ríos", 2), g(1, "Sporting Este", "Molina"), g(1, "Villa Norte", "Acosta", 2),
      g(1, "Villa Norte", "Luna"), g(1, "Defensores Sur", "Soria", 2), g(2, "Sporting Este", "Molina"),
      g(2, "Los Aromos", "Ríos"), g(2, "Los Aromos", "Díaz", 2),
    ],
    sanciones: [
      s(1, "Villa Norte", "Acosta Marcos", "amarilla"), s(2, "Villa Norte", "Acosta Marcos", "amarilla"),
      s(2, "Defensores Sur", "Soria Carlos", "roja", 2, "Doble amonestación"),
      s(1, "Sporting Este", "Molina Diego", "amarilla"),
    ],
    ajustes: [],
  },
  "+30": {
    partidos: [
      p(1, "Los Tigres", "Real Campo", 1, 0), p(1, "Juventud Unida", "Barrio Sur", 2, 2),
      p(2, "Los Tigres", "Juventud Unida", "", "", "Sáb 15:00 hs"), p(2, "Real Campo", "Barrio Sur", "", "", "Sáb 16:30 hs"),
    ],
    goles: [g(1, "Los Tigres", "Vega"), g(1, "Juventud Unida", "Roldán", 2)],
    sanciones: [], ajustes: [],
  },
  "Femenino": {
    partidos: [p(1, "Las Panteras", "Estrella Roja", 1, 1), p(2, "Estrella Roja", "Las Leonas", "", "", "Dom 11:00 hs")],
    goles: [], sanciones: [], ajustes: [],
  },
};

// Categoría +45 con datos reales: fechas 4 y 5 jugadas, fecha 6 pendiente y puntos anteriores (ajustes).
const a = (equipo, pj, g, e, pp) => ({ equipo, pj, g, e, p: pp });
const HS = "14:30 a 15:00 hs";
DEMO["+45"] = {
  partidos: [
    p(4, "Arboleda", "La Banda", 0, 2, HS, "Colonia Uno"), p(4, "Amigos de Lastenia", "La Chile", 2, 0, "16:15 hs", "Colonia Uno"),
    p(4, "17 de Agosto", "Vallistos Fc.", 2, 1, "17:30 hs", "San Justo"), p(4, "Balvin", "Vallistos +45", 3, 0, "17:30 hs", "Vallistos"),
    p(4, "Piloto", "Milagrosa", 3, 0, HS, "Juan Posse"), p(4, "Amistad Fc.", "Defensores de Cuyo", 0, 2, "17:30 hs", "Juan Posse"),
    p(5, "17 de Agosto", "La Banda", 2, 2, HS, "San Justo"), p(5, "Defensores de Cuyo", "Milagrosa", 3, 0, "15:30 a 16:00 hs", "Villa Lastenia"),
    p(5, "Arboleda", "La Chile", 2, 2, "17:20 hs", "Villa Lastenia"), p(5, "Balvin", "Amigos de Lastenia", 2, 2, "16:20 hs", "Colonia Uno"),
    p(5, "Piloto", "Vallistos +45", 2, 0, "17:40 hs", "Colonia Uno"), p(5, "Vallistos Fc.", "Amistad Fc.", 2, 0, "17:20 hs", "Juan Posse"),
    p(6, "Arboleda", "Balvin", "", "", HS, "Complejo 3"), p(6, "La Banda", "La Chile", "", "", "16:15 hs", "Colonia Uno"),
    p(6, "Amistad Fc.", "17 de Agosto", "", "", "17:30 hs", "San Justo"), p(6, "Defensores de Cuyo", "Vallistos +45", "", "", HS, "Vallistos"),
    p(6, "Vallistos Fc.", "Milagrosa", "", "", "17:30 hs", "Vallistos"), p(6, "Piloto", "Amigos de Lastenia", "", "", "16:15 hs", "Juan Posse"),
  ],
  goles: [], sanciones: [],
  ajustes: [
    a("Amigos de Lastenia", 3, 3, 0, 0), a("Vallistos Fc.", 3, 2, 1, 0), a("17 de Agosto", 3, 2, 0, 1),
    a("Vallistos +45", 3, 3, 0, 0), a("Piloto", 3, 1, 0, 2), a("Balvin", 3, 0, 3, 0),
    a("Defensores de Cuyo", 3, 0, 0, 3), a("Milagrosa", 3, 1, 2, 0), a("La Banda", 3, 0, 1, 2),
    a("Amistad Fc.", 2, 1, 1, 0), a("La Chile", 2, 0, 0, 2), a("Arboleda", 3, 0, 0, 3),
  ],
};
