'use client';

import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import { Locate, LocateFixed, Plus, Minus } from 'lucide-react';

export default function Navigation() {
  const map = useMap();
  const [icon, setIcon] = useState(<Locate />);
  const [isClicked, setIsClicked] = useState(false);

  function mapZoomIn() {
    if (!map) return;
    map.zoomIn();
  }

  function mapZoomOut() {
    if (!map) return;
    map.zoomOut();
  }

  useEffect(() => {
    if (isClicked) {
      const interval = setInterval(() => {
        setIcon((prevIcon) =>
          prevIcon.type === Locate ? <LocateFixed /> : <Locate />,
        );
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isClicked]);

  function clickHandler() {
    const geolocation = navigator.geolocation;

    // If Geolocation API is not supported
    if (!geolocation) {
      alert('Geolocation is not supported');
      return;
    }

    setIsClicked(!isClicked);
    geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        if (!map) return;
        map.flyTo([latitude, longitude]);
        setIsClicked(false);
        setIcon(<LocateFixed />);
      },
      () => {
        setIsClicked(false);
        setIcon(<Locate />);
      },
    );
  }

  return (
    <>
      <div
        id="navigation"
        className="absolute top-5 z-[9999] mb-8 flex w-full items-end justify-between px-5"
      >
        {map && (
          <div className="flex flex-col items-center rounded-xl bg-white p-2">
            <button
              className="rounded-md p-2 text-black hover:bg-gray-100"
              aria-label="Zoom In"
              onClick={mapZoomIn}
            >
              <Plus />
            </button>
            <button
              className="rounded-md p-2 text-black hover:bg-gray-100"
              aria-label="Zoom Out"
              onClick={mapZoomOut}
            >
              <Minus />
            </button>
            <button
              className="rounded-md p-2 text-black hover:bg-gray-100"
              aria-label="Navigation"
              onClick={clickHandler}
            >
              {icon}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
