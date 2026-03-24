export const data = {
  city: "Porto",
  centerCoordinates: [41.1496, -8.6109],
  zoom: 14,

  // Municipal garages — the "land options priced at zero"
  garages: [
    { id: "silo-auto", name: "Silo Auto", coords: [41.1525, -8.6066], capacity: 804, operator: "Porto Lazer", note: "Prime downtown — highest conversion value" },
    { id: "palacio-cristal", name: "Palácio de Cristal", coords: [41.1474, -8.6247], capacity: 490, operator: "Porto Lazer", note: "Tourist zone, near Jardins" },
    { id: "adelino", name: "Adelino Amaro da Costa", coords: [41.1557, -8.6273], capacity: 390, operator: "Bragaparques", note: "Boavista corridor" },
    { id: "djoao", name: "D. João I", coords: [41.1474, -8.6090], capacity: 384, operator: "Empark", note: "Central square, high-value land" },
    { id: "palacio-justica", name: "Palácio da Justiça", coords: [41.1446, -8.6177], capacity: 325, operator: "Sabaportugal", note: "Government district" },
    { id: "infante", name: "Infante D. Henrique", coords: [41.1410, -8.6152], capacity: 314, operator: "Sabaportugal", note: "Ribeira / UNESCO zone" },
    { id: "trindade", name: "Trindade", coords: [41.1507, -8.6096], capacity: 292, operator: "CMP", note: "Metro hub, 45 EV chargers already" },
    { id: "castelo-queijo", name: "Castelo do Queijo", coords: [41.1677, -8.6888], capacity: 290, operator: "Sabaportugal", note: "Foz / coastal" },
    { id: "poveiros", name: "Poveiros", coords: [41.1462, -8.6040], capacity: 280, operator: "Porto Lazer", note: "Near Bolhão market" },
  ],

  // Potential robotaxi peripheral hubs
  hubs: [
    { id: "campanha", name: "Campanhã Intermodal", coords: [41.1488, -8.5841], size: "Large", land: "~3 ha", cars: "2,500–3,000", chargers: "1,250–1,500", type: "Multi-story", why: "Train + metro + bus hub" },
    { id: "ramalde", name: "Ramalde Industrial", coords: [41.1720, -8.6420], size: "Large", land: "~4 ha", cars: "2,000–2,500", chargers: "1,000–1,250", type: "Surface + structure", why: "Cheap industrial land, VCI access" },
    { id: "parque-norte", name: "Parque da Cidade North", coords: [41.1710, -8.6788], size: "Medium", land: "~2 ha", cars: "600–700", chargers: "300–350", type: "Surface", why: "Lot exists, near Circunvalação" },
    { id: "francos", name: "Francos / VCI", coords: [41.1620, -8.6500], size: "Medium", land: "~1.5 ha", cars: "800–1,000", chargers: "400–500", type: "Structure", why: "VCI interchange, rapid center access" },
    { id: "sroque", name: "S. Roque East", coords: [41.1556, -8.5819], size: "Medium", land: "~1.5 ha", cars: "400–500", chargers: "200–250", type: "Surface", why: "Heavy vehicle park exists" },
  ],

  // Robotaxi economics
  scenarios: [
    { name: "Bolt (current)", perKm: 0.75, base: 1.50, color: "#6b7280", dashed: true },
    { name: "Mature Fleet (30% share)", perKm: 0.50, base: 2.00, color: "#f59e0b" },
    { name: "Optimized (at scale)", perKm: 0.30, base: 0.50, color: "#10b981" },
  ],

  stats: {
    totalGarageSpaces: 4269,
    onStreetPaidSpaces: 3862, // western zone alone
    pickupDropoffZones: 116,
    accessBollards: 90,
    estimatedParkingRevenue: "€15-20M/yr",
  },
};
