'use client';

import { Locate, LocateFixed, Minus, Plus } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';

export default function Navigation() {
  const map = useMap();
  const pathname = usePathname();
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

  // ページを開いた際に現在地を取得
  useEffect(() => {
    const regex = '/maps/[a-z0-9-]{36}';
    if (!pathname.match(regex)) {
      clickHandler();
    }
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

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
        className="absolute top-5 z-[999] mb-8 flex w-full items-end justify-between px-5"
      >
        {map && (
          <div className="flex flex-col items-center rounded-xl bg-white p-2">
            <button
              type="button"
              className="rounded-md p-2 text-black hover:bg-gray-100"
              aria-label="Zoom In"
              onClick={mapZoomIn}
            >
              <Plus />
            </button>
            <button
              type="button"
              className="rounded-md p-2 text-black hover:bg-gray-100"
              aria-label="Zoom Out"
              onClick={mapZoomOut}
            >
              <Minus />
            </button>
            <button
              type="button"
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
