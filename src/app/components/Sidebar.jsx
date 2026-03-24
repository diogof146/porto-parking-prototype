"use client";

import { useState } from "react";
import { data } from "@/lib/data";

function ViewToggle({ activeView, setActiveView }) {
  const views = [
    { id: "garages", label: "Stranded Assets" },
    { id: "hubs", label: "Hub Strategy" },
    { id: "both", label: "Full Picture" },
  ];
  return (
    <div className="flex gap-1 bg-[#eef0f4] rounded-lg p-1">
      {views.map((v) => (
        <button
          key={v.id}
          onClick={() => setActiveView(v.id)}
          className={`flex-1 px-2 py-1.5 rounded-md text-xs font-medium transition-colors ${
            activeView === v.id
              ? "bg-[var(--accent-blue)] text-white"
              : "text-[var(--muted)] hover:text-[var(--foreground)]"
          }`}
        >
          {v.label}
        </button>
      ))}
    </div>
  );
}

function CostBars({ rideDistance, large }) {
  const text = large ? "text-base" : "text-xs";
  const barH = large ? "h-3" : "h-1.5";

  return (
    <div className={large ? "space-y-3" : "space-y-1.5"}>
      {data.scenarios.map((s) => {
        const cost = s.base + s.perKm * rideDistance;
        const maxCost =
          data.scenarios[0].base + data.scenarios[0].perKm * rideDistance;
        const pct = (cost / maxCost) * 100;
        return (
          <div key={s.name} className="space-y-0.5">
            <div className={`flex justify-between ${text}`}>
              <span
                className={s.dashed ? "text-[var(--muted)]" : "text-[var(--foreground)]"}
              >
                {s.name}
              </span>
              <span className="font-mono" style={{ color: s.color }}>
                {"\u20AC"}
                {cost.toFixed(2)}
              </span>
            </div>
            <div className={`${barH} bg-[#eef0f4] rounded-full overflow-hidden`}>
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${pct}%`,
                  backgroundColor: s.color,
                  opacity: s.dashed ? 0.4 : 1,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CostModal({ rideDistance, setRideDistance, onClose }) {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-[90vw] max-w-[700px] p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold tracking-tight">Cost per Ride</h2>
          <button onClick={onClose} className="text-[var(--muted)] hover:text-[var(--foreground)] text-xl leading-none">&times;</button>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-[var(--muted)]">Ride distance</span>
          <span className="text-sm font-mono">{rideDistance} km</span>
        </div>
        <input
          type="range"
          min={2}
          max={15}
          step={0.5}
          value={rideDistance}
          onChange={(e) => setRideDistance(parseFloat(e.target.value))}
          className="w-full accent-[var(--accent-blue)] mb-6"
        />
        <CostBars rideDistance={rideDistance} large />
      </div>
    </div>
  );
}

function CostCalculator({ rideDistance, setRideDistance, onExpand }) {
  return (
    <div className="space-y-3">
      <button onClick={onExpand} className="w-full text-left group">
        <div className="flex items-center justify-between">
          <span className="text-xs text-[var(--muted)] uppercase tracking-wider">
            Cost per ride
          </span>
          <span className="text-xs text-[var(--muted)]">
            <span className="mr-2">{rideDistance} km</span>
            <span className="text-[10px] normal-case opacity-0 group-hover:opacity-100 transition-opacity">click to expand</span>
          </span>
        </div>
      </button>
      <input
        type="range"
        min={2}
        max={15}
        step={0.5}
        value={rideDistance}
        onChange={(e) => setRideDistance(parseFloat(e.target.value))}
        className="w-full accent-[var(--accent-blue)]"
      />
      <button onClick={onExpand} className="w-full text-left">
        <CostBars rideDistance={rideDistance} />
      </button>
    </div>
  );
}

const balanceRows = [
  { label: "Parking revenue lost", keep: "+€15–20M/yr", enable: "€0", keepColor: "var(--accent-green)", enableColor: "var(--accent-red)" },
  { label: "Garage maintenance", keep: "−€3.4M/yr", enable: "€0", keepColor: "var(--accent-red)", enableColor: "var(--accent-green)" },
  { label: "Enforcement costs", keep: "−€2.5M/yr", enable: "€0", keepColor: "var(--accent-red)", enableColor: "var(--accent-green)" },
  { label: "Central land unlocked", keep: "€0", enable: "+€45–75M", keepColor: "var(--muted)", enableColor: "var(--accent-green)", bold: true },
  { label: "Hub lease income", keep: "€0", enable: "+€3–5M/yr", keepColor: "var(--muted)", enableColor: "var(--accent-green)" },
];

function BalanceSheetTable({ large }) {
  const text = large ? "text-sm" : "text-[10px]";
  const headerText = large ? "text-xs" : "text-[10px]";
  const px = large ? "px-5" : "px-2";
  const py = large ? "py-3" : "py-1";
  const headerPy = large ? "py-3" : "py-1.5";
  const footerPy = large ? "py-4" : "py-1.5";

  return (
    <div className="bg-[#eef0f4] rounded-lg overflow-hidden">
      <div className={`grid grid-cols-3 gap-0 ${headerText} ${px} ${headerPy} border-b border-[var(--card-border)]`}>
        <span className="text-[var(--muted)]"></span>
        <span className="text-[var(--muted)] text-center font-medium">Keep parking</span>
        <span className="text-[var(--muted)] text-center font-medium">Enable hubs</span>
      </div>
      {balanceRows.map((r) => (
        <div
          key={r.label}
          className={`grid grid-cols-3 gap-0 ${text} ${px} ${py} border-b border-[var(--card-border)] last:border-0`}
        >
          <span className={`text-[var(--foreground)] ${r.bold ? "font-semibold" : ""}`}>
            {r.label}
          </span>
          <span className="text-center font-mono" style={{ color: r.keepColor }}>
            {r.keep}
          </span>
          <span className={`text-center font-mono ${r.bold ? "font-semibold" : ""}`} style={{ color: r.enableColor }}>
            {r.enable}
          </span>
        </div>
      ))}
      <div className={`grid grid-cols-3 gap-0 ${text} ${px} ${footerPy} bg-[#e2e5ea] font-semibold`}>
        <span>Net annual</span>
        <span className="text-center font-mono" style={{ color: "var(--accent-amber)" }}>~€10–14M</span>
        <span className="text-center font-mono" style={{ color: "var(--accent-green)" }}>€3–5M + land</span>
      </div>
    </div>
  );
}

function BalanceSheetModal({ onClose }) {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-[90vw] max-w-[700px] p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold tracking-tight">City Balance Sheet</h2>
          <button onClick={onClose} className="text-[var(--muted)] hover:text-[var(--foreground)] text-xl leading-none">&times;</button>
        </div>
        <BalanceSheetTable large />
        <p className="text-xs text-[var(--muted)] mt-4 leading-relaxed">
          Hub build cost (~€375–425M) is paid by the fleet operator, not the city.
          Parking revenue is declining regardless as ride-hailing grows.
        </p>
      </div>
    </div>
  );
}

function CityBalanceSheet({ onExpand }) {
  return (
    <div className="space-y-2">
      <button
        onClick={onExpand}
        className="w-full text-left group"
      >
        <div className="flex items-center justify-between text-xs text-[var(--muted)] uppercase tracking-wider">
          <span>City balance sheet</span>
          <span className="text-[10px] normal-case opacity-0 group-hover:opacity-100 transition-opacity">click to expand</span>
        </div>
      </button>
      <button onClick={onExpand} className="w-full text-left">
        <BalanceSheetTable large={false} />
      </button>
      <p className="text-[10px] text-[var(--muted)] leading-relaxed">
        Hub build cost (~€375–425M) is paid by fleet operator, not the city.
        Parking revenue is declining regardless.
      </p>
    </div>
  );
}

function Stats({ activeView }) {
  const totalSpaces = data.garages.reduce((s, g) => s + g.capacity, 0);
  const totalSpacesFormatted = new Intl.NumberFormat("en-US").format(totalSpaces);
  const concessionedCount = data.garages.filter(
    (g) => g.operator !== "CMP"
  ).length;

  return (
    <div className="grid grid-cols-2 gap-2">
      {(activeView === "garages" || activeView === "both") && (
        <>
          <div className="bg-[#eef0f4] rounded-lg p-2.5">
            <div className="text-lg font-bold text-[var(--accent-blue)]">
              {data.garages.length}
            </div>
            <div className="text-[10px] text-[var(--muted)]">
              Municipal garages
            </div>
          </div>
          <div className="bg-[#eef0f4] rounded-lg p-2.5">
            <div className="text-lg font-bold text-[var(--accent-blue)]">
              {totalSpacesFormatted}
            </div>
            <div className="text-[10px] text-[var(--muted)]">
              Garage spaces
            </div>
          </div>
          <div className="bg-[#eef0f4] rounded-lg p-2.5">
            <div className="text-lg font-bold text-[var(--accent-amber)]">
              {concessionedCount}
            </div>
            <div className="text-[10px] text-[var(--muted)]">
              Concessioned
            </div>
          </div>
          <div className="bg-[#eef0f4] rounded-lg p-2.5">
            <div className="text-lg font-bold text-[var(--accent-red)]">
              {data.stats.estimatedParkingRevenue}
            </div>
            <div className="text-[10px] text-[var(--muted)]">
              Revenue at risk
            </div>
          </div>
        </>
      )}
      {(activeView === "hubs" || activeView === "both") && (
        <>
          <div className="bg-[#eef0f4] rounded-lg p-2.5">
            <div className="text-lg font-bold text-[var(--accent-green)]">
              {data.hubs.length}
            </div>
            <div className="text-[10px] text-[var(--muted)]">
              Hub candidates
            </div>
          </div>
          <div className="bg-[#eef0f4] rounded-lg p-2.5">
            <div className="text-lg font-bold text-[var(--accent-green)]">
              6,300–7,700
            </div>
            <div className="text-[10px] text-[var(--muted)]">
              Total hub capacity
            </div>
          </div>
          <div className="bg-[#eef0f4] rounded-lg p-2.5">
            <div className="text-lg font-bold text-[var(--accent-amber)]">
              40
            </div>
            <div className="text-[10px] text-[var(--muted)]">
              EV chargers today
            </div>
          </div>
          <div className="bg-[#eef0f4] rounded-lg p-2.5">
            <div className="text-lg font-bold text-[var(--accent-amber)]">
              3,150–3,850
            </div>
            <div className="text-[10px] text-[var(--muted)]">
              Chargers needed
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function Sidebar({
  activeView,
  setActiveView,
  rideDistance,
  setRideDistance,
}) {
  const [showModal, setShowModal] = useState(null); // null | "balance" | "cost"

  return (
    <>
      {showModal === "balance" && <BalanceSheetModal onClose={() => setShowModal(null)} />}
      {showModal === "cost" && <CostModal rideDistance={rideDistance} setRideDistance={setRideDistance} onClose={() => setShowModal(null)} />}
      <aside className="w-[300px] h-full bg-[var(--card)] border-r border-[var(--card-border)] flex flex-col overflow-hidden">
        <div className="p-4 border-b border-[var(--card-border)]">
          <h1 className="text-sm font-semibold tracking-tight">
            Porto Robotaxi Transition
          </h1>
        </div>

        <div className="p-3 border-b border-[var(--card-border)]">
          <ViewToggle activeView={activeView} setActiveView={setActiveView} />
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeView === "both" && (
            <>
              <div className="border-t border-[var(--card-border)] pt-4">
                <CityBalanceSheet onExpand={() => setShowModal("balance")} />
              </div>
              <div className="border-t border-[var(--card-border)] pt-4">
                <CostCalculator
                  rideDistance={rideDistance}
                  setRideDistance={setRideDistance}
                  onExpand={() => setShowModal("cost")}
                />
              </div>
            </>
          )}
      </div>

      <div className="p-3 border-t border-[var(--card-border)] text-[10px] text-[var(--muted)]">
        Source: opendata.porto.digital (CC0)
      </div>
    </aside>
    </>
  );
}
