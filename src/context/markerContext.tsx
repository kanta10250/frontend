'use client';

import { createContext, useState, useContext, ReactNode } from 'react';
import L from 'leaflet';

// Type definition of context
interface MarkerContextType {
  markerState: L.Marker | undefined;
  nowLocation: string;
  setMarkerState: (marker: L.Marker) => void;
  setNowLocation: (location: string) => void;
}

// Default value of context
const MarkerContext = createContext<MarkerContextType | undefined>(undefined);

export const MarkerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [markerState, setMarkerState] = useState<L.Marker>();
  const [nowLocation, setNowLocation] = useState<string>('');

  return (
    <MarkerContext.Provider
      value={{ markerState, nowLocation, setMarkerState, setNowLocation }}
    >
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
