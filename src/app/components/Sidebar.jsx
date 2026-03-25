"use client";

import { data } from "@/lib/data";

function Connector() {
  return (
    <div className="flex justify-center py-1">
      <div className="w-px h-5 bg-gray-300" />
    </div>
  );
}

function FlowStep({ color, title, subtitle, active }) {
  return (
    <div
      className={`rounded-lg px-3 py-2.5 text-center transition-all duration-300 ${active ? "ring-2 ring-offset-1" : ""}`}
      style={{
        backgroundColor: color,
        ringColor: active ? color : "transparent",
      }}
    >
      <div className="text-white font-semibold text-xs leading-tight">
        {title}
      </div>
      {subtitle && (
        <div className="text-white/70 text-[10px] mt-0.5">{subtitle}</div>
      )}
    </div>
  );
}

function ChoiceStep({ corridor }) {
  return (
    <div className="flex items-stretch gap-2">
      <div className="flex-1 rounded-lg bg-[#4338ca] px-2 py-2 text-center">
        <div className="text-white font-semibold text-[11px] leading-tight">
          Take metro / bus
        </div>
        <div className="text-white/70 text-[10px] mt-0.5">
          {corridor
            ? `Line ${corridor.metroLine} → ${corridor.destination}`
            : "Existing public transit"}
        </div>
      </div>
      <div className="flex items-center text-[10px] text-gray-400 font-medium">
        or
      </div>
      <div className="flex-1 rounded-lg bg-[#4338ca] px-2 py-2 text-center">
        <div className="text-white font-semibold text-[11px] leading-tight">
          Self-driving shuttle
        </div>
        <div className="text-white/70 text-[10px] mt-0.5">
          {corridor
            ? `Door-to-door, ${corridor.shuttleCost}`
            : "Provided by the hub"}
        </div>
      </div>
    </div>
  );
}

function MergeConnector() {
  return (
    <div className="flex justify-center py-1">
      <div
        className="w-px h-5"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, #d1d5db 0px, #d1d5db 3px, transparent 3px, transparent 6px)",
        }}
      />
    </div>
  );
}

function CorridorSelector({ selectedCorridor, onSelect }) {
  return (
    <div className="space-y-1.5">
      <div className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">
        Select a corridor
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        {data.corridors.map((c) => {
          const active = selectedCorridor === c.id;
          const hub = data.hubs.find((h) => h.id === c.hubId);
          const j = c.journey;
          const totalMin = j.driveTime + j.parkTime + j.metroTime + j.walkTime;
          return (
            <button
              key={c.id}
              onClick={() => onSelect(active ? null : c.id)}
              className={`text-left px-2.5 py-2 rounded-lg border text-xs transition-all ${
                active
                  ? "bg-[#059669] text-white border-[#059669]"
                  : "bg-white text-gray-700 border-gray-200 hover:border-[#059669] hover:bg-emerald-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[11px]">{c.name.split(" — ")[0]}</span>
                <span className={`font-bold text-[11px] ${active ? "text-white" : "text-emerald-600"}`}>
                  {totalMin}′
                </span>
              </div>
              <div className={`text-[10px] mt-0.5 ${active ? "text-white/70" : "text-gray-400"}`}>
                {hub.shortName} → {c.destination}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}


export default function Sidebar({ selectedCorridor, setSelectedCorridor }) {
  const corridor = data.corridors.find((c) => c.id === selectedCorridor);
  const hub = corridor
    ? data.hubs.find((h) => h.id === corridor.hubId)
    : null;

  return (
    <aside className="w-[320px] h-full bg-[var(--card)] border-r border-[var(--card-border)] flex flex-col overflow-hidden">
      <div className="p-4 border-b border-[var(--card-border)]">
        <h1 className="text-sm font-semibold tracking-tight text-gray-900">
          Porto Car-Free Centre
        </h1>
        <p className="text-[10px] text-gray-400 mt-0.5">
          Mobility hub strategy for the VCI ring
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-0">
        <FlowStep
          color="#8B3A3A"
          title="Traffic in the city"
          subtitle="Congestion, pollution, noise"
        />
        <Connector />

        <FlowStep
          color="#A0633A"
          title="Remove city-center parking"
          subtitle="Free up space for people"
        />
        <Connector />

        <FlowStep
          color="#059669"
          title="Build hubs at the outskirts"
          subtitle={hub ? hub.name : "e.g. Q-Park facilities"}
          active={!!hub}
        />
        <Connector />

        <FlowStep
          color="#059669"
          title="Park your car in the hub"
          subtitle="Safe, affordable, convenient"
        />
        <Connector />

        <ChoiceStep corridor={corridor} />
        <MergeConnector />

        <FlowStep
          color="#2d5a27"
          title="Arrive in city center"
          subtitle={corridor ? `${corridor.destination} station` : null}
        />

        {/* Corridor selector */}
        <div className="pt-5 border-t border-gray-200 mt-5">
          <CorridorSelector
            selectedCorridor={selectedCorridor}
            onSelect={setSelectedCorridor}
          />
        </div>

      </div>

      <div className="p-3 border-t border-[var(--card-border)] text-[10px] text-gray-400">
        Data: Metro do Porto, opendata.porto.digital
      </div>
    </aside>
  );
}
