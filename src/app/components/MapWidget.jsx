"use client"

import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./BaseMap'), {
  ssr: false,
  loading: () => <div className="h-[500px] w-full animate-pulse bg-muted rounded-lg flex items-center justify-center">Loading Map...</div>
});

export default function MapWidget() {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-semibold">Porto Parking Zones</h3>
      <Map />
    </div>
  );
}
