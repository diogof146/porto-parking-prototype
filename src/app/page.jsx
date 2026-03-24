"use client";

import dynamic from "next/dynamic";
import Sidebar from "./components/Sidebar";
import { useState } from "react";

const StrategicMap = dynamic(() => import("./components/StrategicMap"), {
  ssr: false,
  loading: () => (
    <div className="flex-1 bg-[var(--card)] animate-pulse flex items-center justify-center text-[var(--muted)]">
      Loading map...
    </div>
  ),
});

export default function Home() {
  const [activeView, setActiveView] = useState("garages"); // garages | hubs | both
  const [rideDistance, setRideDistance] = useState(7);

  return (
    <div className="h-full flex">
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        rideDistance={rideDistance}
        setRideDistance={setRideDistance}
      />
      <div className="flex-1 relative">
        <StrategicMap activeView={activeView} />
      </div>
    </div>
  );
}
