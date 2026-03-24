import { useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { data } from "@/lib/data";

// Diamond marker for hubs using SVG divIcon
function HubMarker({ hub }) {
  const map = useMap();
  const markerRef = useRef(null);

  useEffect(() => {
    if (!map) return;
    const L = require("leaflet");
    const icon = L.divIcon({
      className: "",
      html: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2 L22 12 L12 22 L2 12 Z" fill="#059669" stroke="#064e3b" stroke-width="1.5" opacity="0.9"/>
        <text x="12" y="15" text-anchor="middle" fill="white" font-size="8" font-weight="bold">H</text>
      </svg>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });
    const marker = L.marker(hub.coords, { icon }).addTo(map);
    marker.bindPopup(
      `<div style="min-width:200px">
        <strong style="color:#059669">${hub.name}</strong><br/>
        <span style="color:#6b7280;font-size:11px">${hub.why}</span>
        <div style="margin-top:6px;padding-top:6px;border-top:1px solid #e5e7eb">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:2px 12px;font-size:11px">
            <span style="color:#6b7280">Land</span><span>${hub.land}</span>
            <span style="color:#6b7280">Type</span><span>${hub.type}</span>
            <span style="color:#6b7280">Cars</span><strong>${hub.cars}</strong>
            <span style="color:#6b7280">Chargers</span><strong>${hub.chargers}</strong>
          </div>
        </div>
      </div>`
    );
    markerRef.current = marker;
    return () => marker.remove();
  }, [map, hub]);

  return null;
}

// VCI ring road approximation as a dashed circle
function VCIRing() {
  const map = useMap();
  useEffect(() => {
    if (!map) return;
    const L = require("leaflet");
    const circle = L.circle([41.157, -8.630], {
      radius: 3200,
      color: "#9ca3af",
      weight: 1.5,
      dashArray: "8, 6",
      fill: false,
      opacity: 0.5,
    }).addTo(map);
    circle.bindTooltip("VCI Ring Road (approx.)", {
      permanent: false,
      className: "vci-tooltip",
    });
    return () => circle.remove();
  }, [map]);
  return null;
}

export default function StrategicMap({ activeView }) {
  const showGarages = activeView === "garages" || activeView === "both";
  const showHubs = activeView === "hubs" || activeView === "both";

  return (
    <MapContainer
      center={data.centerCoordinates}
      zoom={data.zoom}
      style={{ height: "100%", width: "100%" }}
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />

      <VCIRing />

      {/* Municipal garages */}
      {showGarages &&
        data.garages.map((g) => (
          <CircleMarker
            key={g.id}
            center={g.coords}
            radius={Math.max(8, Math.sqrt(g.capacity) * 1.2)}
            pathOptions={{
              color: "#1d4ed8",
              fillColor: "#2563eb",
              fillOpacity: 0.55,
              weight: 2,
            }}
          >
            <Popup>
              <div style={{ minWidth: 200 }}>
                <strong style={{ color: "#3b82f6" }}>{g.name}</strong>
                <br />
                <span style={{ color: "#9ca3af", fontSize: 11 }}>
                  {g.capacity} spaces — {g.operator}
                </span>
                <br />
                <span style={{ color: "#f59e0b", fontSize: 11 }}>
                  {g.note}
                </span>
              </div>
            </Popup>
          </CircleMarker>
        ))}

      {/* Hub candidates */}
      {showHubs && data.hubs.map((h) => <HubMarker key={h.id} hub={h} />)}
    </MapContainer>
  );
}
