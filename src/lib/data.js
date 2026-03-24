export const data = {
  city: "Porto",
  centerCoordinates: [41.1579, -8.6291], // Lat, Lng
  population: 231800,
  mobility: {
    carOwnershipRate: "450 per 1000 residents",
  },
  parking: {
    onStreetSpaces: 12000,
    offStreetSpaces: 8500,
    zones: [
      {
        id: "zone-1",
        name: "Downtown (Baixa)",
        type: "Premium",
        pricing: "€1.20/hour",
        coordinates: [41.1496, -8.6109],
      },
      {
        id: "zone-2",
        name: "Boavista",
        type: "Standard",
        pricing: "€0.80/hour",
        coordinates: [41.1579, -8.6291],
      },
      {
        id: "zone-3",
        name: "Campanhã",
        type: "Economy",
        pricing: "€0.40/hour",
        coordinates: [41.1488, -8.5841],
      }
    ]
  }
};
