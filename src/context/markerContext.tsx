'use client';

import type L from 'leaflet';
import { type ReactNode, createContext, useContext, useState } from 'react';

// Type definition of context
interface MarkerContextType {
  markerState: L.Marker | null | undefined;
  setMarkerState: (marker: L.Marker | null) => void;
}

// Default value of context
const MarkerContext = createContext<MarkerContextType | undefined>(undefined);

export const MarkerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [markerState, setMarkerState] = useState<L.Marker | null>();

  return (
    <MarkerContext.Provider value={{ markerState, setMarkerState }}>
      {children}
    </MarkerContext.Provider>
  );
};

export const useMarkerContext = (): MarkerContextType => {
  const context = useContext(MarkerContext);
  if (context === undefined) {
    throw new Error('useMarkerContext must be used within an MarkerProvider');
  }
  return context;
};
