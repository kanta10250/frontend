'use client';

import { createContext, useState, useContext, ReactNode } from 'react';
import L from 'leaflet';

// Type definition of context
interface MarkerContextType {
  markerState: L.Marker | undefined;
  setMarkerState: (marker: L.Marker) => void;
}

// Default value of context
const MarkerContext = createContext<MarkerContextType | undefined>(undefined);

export const MarkerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [markerState, setMarkerState] = useState<L.Marker>();

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
