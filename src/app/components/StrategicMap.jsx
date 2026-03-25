"use client";

import { useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  CircleMarker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { data } from "@/lib/data";

// VCI ring — car-free zone boundary
function VCIRing() {
  const map = useMap();
  useEffect(() => {
    if (!map) return;
    const L = require("leaflet");
    // Filled zone
    const fill = L.circle(data.vci.center, {
      radius: data.vci.radius,
      color: "#059669",
      weight: 2,
      dashArray: "10, 6",
      fillColor: "#059669",
      fillOpacity: 0.06,
      opacity: 0.5,
    }).addTo(map);
    fill.bindTooltip("Car-free zone inside VCI", {
      permanent: false,
      className: "vci-tooltip",
    });
    return () => fill.remove();
  }, [map]);
  return null;
}

// Hub marker using Leaflet divIcon
function HubMarker({ hub, active, onClick }) {
  const map = useMap();
  const markerRef = useRef(null);

  useEffect(() => {
    if (!map) return;
    const L = require("leaflet");

    const size = active ? 36 : 28;
    const half = size / 2;
    const metroText = hub.metro.join(", ");
    const bgColor = active ? "#059669" : "#065f46";
    const strokeColor = active ? "#fff" : "#064e3b";
    const strokeWidth = active ? 2.5 : 1.5;

    const icon = L.divIcon({
      className: "",
      html: `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none">
        <circle cx="${half}" cy="${half}" r="${half - 2}" fill="${bgColor}" stroke="${strokeColor}" stroke-width="${strokeWidth}" opacity="0.95"/>
        <text x="${half}" y="${half + 1}" text-anchor="middle" dominant-baseline="middle" fill="white" font-size="${active ? 11 : 9}" font-weight="bold">P</text>
      </svg>`,
      iconSize: [size, size],
      iconAnchor: [half, half],
    });

    const marker = L.marker(hub.coords, { icon }).addTo(map);

    marker.bindPopup(
      `<div style="min-width:220px">
        <strong style="color:#059669;font-size:13px">${hub.name}</strong>
        <div style="color:#6b7280;font-size:11px;margin-top:2px">${hub.position}</div>
        <div style="margin-top:8px;padding-top:8px;border-top:1px solid #e5e7eb">
          <div style="display:grid;grid-template-columns:auto 1fr;gap:3px 10px;font-size:11px">
            <span style="color:#6b7280">Score</span><strong>${hub.score}/25</strong>
            <span style="color:#6b7280">Priority</span><strong>#${hub.priority}</strong>
            <span style="color:#6b7280">Metro</span><span>Line${hub.metro.length > 1 ? "s" : ""} ${metroText}</span>
            <span style="color:#6b7280">To centre</span><span>${hub.metroTime}</span>
            <span style="color:#6b7280">Captures</span><span>${hub.captures}</span>
            <span style="color:#6b7280">Traffic</span><strong>${hub.capturesTraffic}</strong>
          </div>
        </div>
        <div style="margin-top:8px;font-size:10px;color:#6b7280;font-style:italic">${hub.why}</div>
      </div>`
    );

    marker.on("click", () => onClick(hub.id));
    markerRef.current = marker;
    return () => marker.remove();
  }, [map, hub, active, onClick]);

  return null;
}

// Journey route: entry point → hub → metro to centre
function JourneyRoute({ corridor, hub }) {
  const map = useMap();
  useEffect(() => {
    if (!map || !corridor || !hub) return;
    const L = require("leaflet");

    // Drive route: entry → hub (dashed gray)
    const driveLine = L.polyline([corridor.entryCoords, hub.coords], {
      color: "#6b7280",
      weight: 3,
      dashArray: "8, 6",
      opacity: 0.7,
    }).addTo(map);

    // Entry point marker
    const entryIcon = L.divIcon({
      className: "",
      html: `<svg width="20" height="20" viewBox="0 0 20 20">
        <circle cx="10" cy="10" r="7" fill="#6b7280" stroke="#fff" stroke-width="2" opacity="0.9"/>
      </svg>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });
    const entryMarker = L.marker(corridor.entryCoords, { icon: entryIcon }).addTo(map);
    entryMarker.bindTooltip(corridor.name, { permanent: false });

    // Fit map to show the journey
    const bounds = L.latLngBounds([
      corridor.entryCoords,
      hub.coords,
      data.destination.coords,
    ]);
    map.fitBounds(bounds, { padding: [60, 60], maxZoom: 13 });

    return () => {
      driveLine.remove();
      entryMarker.remove();
    };
  }, [map, corridor, hub]);

  return null;
}

// Destination marker (Trindade)
function DestinationMarker() {
  const map = useMap();
  useEffect(() => {
    if (!map) return;
    const L = require("leaflet");
    const icon = L.divIcon({
      className: "",
      html: `<svg width="24" height="24" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" fill="#1d4ed8" stroke="#fff" stroke-width="2.5" opacity="0.9"/>
        <text x="12" y="13" text-anchor="middle" dominant-baseline="middle" fill="white" font-size="8" font-weight="bold">T</text>
      </svg>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });
    const marker = L.marker(data.destination.coords, { icon }).addTo(map);
    marker.bindPopup(
      `<div><strong style="color:#1d4ed8">${data.destination.name}</strong><br/><span style="font-size:11px;color:#6b7280">${data.destination.note}</span></div>`
    );
    return () => marker.remove();
  }, [map]);
  return null;
}

export default function StrategicMap({ selectedCorridor, onSelectHub }) {
  const corridor = data.corridors.find((c) => c.id === selectedCorridor);
  const activeHubId = corridor?.hubId;
  const activeHub = activeHubId
    ? data.hubs.find((h) => h.id === activeHubId)
    : null;

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

      {/* Car-free zone */}
      <VCIRing />

      {/* Metro lines */}
      {data.metroLines.map((line) => (
        <Polyline
          key={line.id}
          positions={line.path}
          pathOptions={{
            color: line.color,
            weight: corridor && corridor.metroLine === line.id ? 4 : 2,
            opacity: corridor
              ? corridor.metroLine === line.id
                ? 0.9
                : 0.2
              : 0.5,
          }}
        >
          <Popup>
            <div>
              <strong style={{ color: line.color }}>{line.name}</strong>
              <br />
              <span style={{ fontSize: 11, color: "#6b7280" }}>
                {line.stations.length} stations
              </span>
            </div>
          </Popup>
        </Polyline>
      ))}

      {/* Hub markers */}
      {data.hubs.map((hub) => (
        <HubMarker
          key={hub.id}
          hub={hub}
          active={hub.id === activeHubId}
          onClick={onSelectHub}
        />
      ))}

      {/* Journey route when corridor selected */}
      {corridor && activeHub && (
        <JourneyRoute corridor={corridor} hub={activeHub} />
      )}
    </MapContainer>
  );
}
