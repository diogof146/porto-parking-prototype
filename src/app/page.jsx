"use client";

import dynamic from "next/dynamic";
import Sidebar from "./components/Sidebar";
import { useState, useCallback } from "react";
import { data } from "@/lib/data";

const StrategicMap = dynamic(() => import("./components/StrategicMap"), {
  ssr: false,
  loading: () => (
    <div className="flex-1 bg-[var(--card)] animate-pulse flex items-center justify-center text-[var(--muted)]">
      Loading map...
    </div>
  ),
});

export default function Home() {
  const [selectedCorridor, setSelectedCorridor] = useState(null);

  // When a hub is clicked on the map, select its corridor
  const handleSelectHub = useCallback((hubId) => {
    const corridor = data.corridors.find((c) => c.hubId === hubId);
    if (corridor) {
      setSelectedCorridor(corridor.id);
    }
  }, []);

  return (
    <div className="h-full flex">
      <Sidebar
        selectedCorridor={selectedCorridor}
        setSelectedCorridor={setSelectedCorridor}
      />
      <div className="flex-1 relative">
        <StrategicMap
          selectedCorridor={selectedCorridor}
          onSelectHub={handleSelectHub}
        />
      </div>
    </div>
  );
}
