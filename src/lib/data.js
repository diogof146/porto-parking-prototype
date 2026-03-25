export const data = {
  city: "Porto",
  centerCoordinates: [41.1496, -8.6109],
  zoom: 13,

  // VCI ring approximation
  vci: {
    center: [41.157, -8.630],
    radius: 3200,
    length: "21 km",
    dailyTraffic: "250,000+",
  },

  // 6 strategy hubs around the VCI ring
  hubs: [
    {
      id: "ismai",
      name: "ISMAI / Castêlo da Maia",
      shortName: "ISMAI",
      coords: [41.2615, -8.6195],
      position: "North (12 o'clock)",
      captures: "A3 from Braga/Minho",
      capturesTraffic: "~90,000 vehicles/day",
      metro: ["C"],
      metroTime: "~30 min to Trindade",
      score: 23,
      priority: 2,
      why: "A3 motorway meets metro area — massive volume, ISMAI already a de facto hub",
    },
    {
      id: "dragao",
      name: "Estádio do Dragão",
      shortName: "Dragão",
      coords: [41.1613, -8.5846],
      position: "East (2 o'clock)",
      captures: "A4 from east, A43, Ponte do Freixo / A1",
      capturesTraffic: "250,000+ vehicles/day",
      metro: ["A", "B", "C", "E", "F"],
      metroTime: "~10 min to Trindade",
      score: 23,
      priority: 1,
      why: "Already has Park & Ride, 5 metro lines — easiest win, just scale up",
    },
    {
      id: "matosinhos",
      name: "Senhor de Matosinhos",
      shortName: "Matosinhos",
      coords: [41.1822, -8.6889],
      position: "West (9 o'clock)",
      captures: "A28 from northern coast, Leixões port",
      capturesTraffic: "Heavy commuter corridor",
      metro: ["A"],
      metroTime: "~25 min to Trindade",
      score: 21,
      priority: 4,
      why: "Intercepts northwest-bound coast traffic at Line A terminus",
    },
    {
      id: "santo-ovidio",
      name: "Santo Ovídio",
      shortName: "Santo Ovídio",
      coords: [41.1158, -8.6097],
      position: "South (6 o'clock)",
      captures: "A1 from Lisbon (busiest motorway in PT), A44",
      capturesTraffic: "170,000+ vehicles/day (Arrábida alone)",
      metro: ["D"],
      metroTime: "~15 min to São Bento",
      score: 21,
      priority: 3,
      why: "Intercepts ALL south traffic before Douro bridges — critical",
    },
  ],

  // Travel corridors — each maps to a hub
  corridors: [
    {
      id: "a1-south",
      name: "A1 — From Lisbon / South",
      description: "Coimbra, Aveiro, Lisbon",
      hubId: "santo-ovidio",
      entryCoords: [41.08, -8.58],
      metroLine: "D",
      destination: "São Bento",
      journey: {
        driveDistance: "17 km",
        driveTime: 12,
        parkTime: 2,
        metroTime: 15,
        walkTime: 3,
        shuttleTime: 12,
      },
      shuttleCost: "~€5",
    },
    {
      id: "a3-north",
      name: "A3 — From Braga / North",
      description: "Minho, Guimarães, Braga",
      hubId: "ismai",
      entryCoords: [41.30, -8.62],
      metroLine: "C",
      destination: "Trindade",
      journey: {
        driveDistance: "15 km",
        driveTime: 10,
        parkTime: 2,
        metroTime: 30,
        walkTime: 3,
        shuttleTime: 20,
      },
      shuttleCost: "~€6",
    },
    {
      id: "a4-east",
      name: "A4 — From Vila Real / East",
      description: "Trás-os-Montes, Amarante",
      hubId: "dragao",
      entryCoords: [41.16, -8.52],
      metroLine: "A",
      destination: "Trindade",
      journey: {
        driveDistance: "8 km",
        driveTime: 6,
        parkTime: 2,
        metroTime: 10,
        walkTime: 3,
        shuttleTime: 8,
      },
      shuttleCost: "~€4",
    },
    {
      id: "a28-coast",
      name: "A28 — From Viana / Coast",
      description: "Northern coast, Viana do Castelo",
      hubId: "matosinhos",
      entryCoords: [41.22, -8.72],
      metroLine: "A",
      destination: "Trindade",
      journey: {
        driveDistance: "12 km",
        driveTime: 8,
        parkTime: 2,
        metroTime: 25,
        walkTime: 3,
        shuttleTime: 15,
      },
      shuttleCost: "~€5",
    },
  ],

  // Metro lines with simplified polylines for map rendering
  metroLines: [
    {
      id: "A",
      name: "Line A (Blue)",
      color: "#0075BF",
      stations: ["Senhor de Matosinhos", "Matosinhos Sul", "Câmara Matosinhos", "Parque Real", "Pedro Hispano", "Estádio do Mar", "Mercado", "Brito Capelo", "Parque Maia", "Zona Industrial", "Cândido dos Reis", "Viso", "Ramalde", "Francos", "Casa da Música", "Carolina Michaelis", "Lapa", "Trindade", "Bolhão", "Campo 24 de Agosto", "Heroísmo", "Campanhã", "Estádio do Dragão"],
      path: [
        [41.1822, -8.6889], [41.1785, -8.6820], [41.1748, -8.6740],
        [41.1720, -8.6650], [41.1690, -8.6580], [41.1670, -8.6520],
        [41.1650, -8.6460], [41.1630, -8.6400], [41.1610, -8.6350],
        [41.1585, -8.6306], // Casa da Música
        [41.1560, -8.6240], [41.1540, -8.6180],
        [41.1507, -8.6096], // Trindade
        [41.1496, -8.6060], [41.1490, -8.6000],
        [41.1488, -8.5920], [41.1488, -8.5841], // Campanhã
        [41.1613, -8.5846], // Dragão
      ],
    },
    {
      id: "B",
      name: "Line B (Red)",
      color: "#EE2A24",
      stations: ["Póvoa de Varzim", "Vila do Conde", "Fonte do Cuco", "Verdes", "ISMAI", "Castêlo da Maia", "Mandim", "Zona Ind.", "Cândido dos Reis", "Viso", "Ramalde", "Francos", "Casa da Música", "Carolina Michaelis", "Lapa", "Trindade", "Bolhão", "Campo 24 de Agosto", "Heroísmo", "Campanhã", "Estádio do Dragão"],
      path: [
        [41.3785, -8.7625], // Póvoa
        [41.3510, -8.7440], // Vila do Conde
        [41.2750, -8.6400], // Fonte do Cuco
        [41.2615, -8.6195], // ISMAI area
        [41.2400, -8.6200],
        [41.2100, -8.6300],
        [41.1900, -8.6350],
        [41.1720, -8.6500],
        [41.1650, -8.6460],
        [41.1585, -8.6306], // Casa da Música
        [41.1507, -8.6096], // Trindade
        [41.1488, -8.5841], // Campanhã
        [41.1613, -8.5846], // Dragão
      ],
    },
    {
      id: "C",
      name: "Line C (Green)",
      color: "#5EB230",
      stations: ["ISMAI", "Castêlo da Maia", "Mandim", "Zona Ind.", "Cândido dos Reis", "Viso", "Ramalde", "Francos", "Casa da Música", "Carolina Michaelis", "Lapa", "Trindade", "Bolhão", "Campo 24 de Agosto", "Heroísmo", "Campanhã", "Estádio do Dragão"],
      path: [
        [41.2615, -8.6195], // ISMAI
        [41.2400, -8.6200],
        [41.2100, -8.6300],
        [41.1900, -8.6350],
        [41.1720, -8.6500],
        [41.1650, -8.6460],
        [41.1585, -8.6306], // Casa da Música
        [41.1507, -8.6096], // Trindade
        [41.1488, -8.5841], // Campanhã
        [41.1613, -8.5846], // Dragão
      ],
    },
    {
      id: "D",
      name: "Line D (Yellow)",
      color: "#F9A825",
      stations: ["Hospital São João", "IPO", "Pólo Universitário", "Salgueiros", "Marquês", "Combatentes", "Aliados", "São Bento", "Jardim do Morro", "General Torres", "Santo Ovídio", "Manuel Leão", "João de Deus", "D. João II", "Vila d'Este"],
      path: [
        [41.1860, -8.6045], // Hospital São João
        [41.1790, -8.6060],
        [41.1720, -8.6070],
        [41.1640, -8.6080],
        [41.1580, -8.6090],
        [41.1530, -8.6095],
        [41.1507, -8.6096], // Trindade area (Aliados)
        [41.1460, -8.6100], // São Bento
        [41.1395, -8.6120], // Dom Luís I Bridge
        [41.1340, -8.6110], // Jardim do Morro
        [41.1280, -8.6100],
        [41.1158, -8.6097], // Santo Ovídio
        [41.1080, -8.6090],
        [41.1010, -8.6050], // Vila d'Este
      ],
    },
    {
      id: "E",
      name: "Line E (Violet)",
      color: "#9B59B6",
      stations: ["Aeroporto", "Verdes", "Fonte do Cuco", "Cândido dos Reis", "Viso", "Ramalde", "Casa da Música", "Trindade", "Campanhã", "Estádio do Dragão"],
      path: [
        [41.2370, -8.6700], // Aeroporto
        [41.2200, -8.6550],
        [41.2100, -8.6300],
        [41.1900, -8.6350],
        [41.1720, -8.6500],
        [41.1585, -8.6306], // Casa da Música
        [41.1507, -8.6096], // Trindade
        [41.1488, -8.5841], // Campanhã
        [41.1613, -8.5846], // Dragão
      ],
    },
    {
      id: "F",
      name: "Line F (Orange)",
      color: "#F57C00",
      stations: ["Senhora da Hora", "Sete Bicas", "Viso", "Ramalde", "Casa da Música", "Trindade", "Campanhã", "Estádio do Dragão", "Contumil", "Nasoni", "Nau Vitória", "Levada", "Rio Tinto", "Campainha", "Baguim", "Carreira", "Venda Nova", "Fânzeres"],
      path: [
        [41.1870, -8.6650], // Senhora da Hora
        [41.1800, -8.6580],
        [41.1720, -8.6500],
        [41.1585, -8.6306], // Casa da Música
        [41.1507, -8.6096], // Trindade
        [41.1488, -8.5841], // Campanhã
        [41.1613, -8.5846], // Dragão
        [41.1620, -8.5700],
        [41.1630, -8.5550],
        [41.1600, -8.5400],
        [41.1570, -8.5250], // Fânzeres area
      ],
    },
  ],

  // Key destination in the centre
  destination: {
    name: "Trindade",
    coords: [41.1507, -8.6096],
    note: "Central hub — all metro lines converge",
  },

  stats: {
    vciLength: "21 km",
    metroLines: 6,
    metroStations: 85,
    metroTrack: "70 km",
    busLines: 88,
    dailyVCITraffic: "250,000+",
    arrabidaBridge: "170,000/day",
    annualTourists: "10M+",
  },
};
