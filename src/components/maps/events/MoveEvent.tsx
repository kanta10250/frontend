import { useMapEvents } from 'react-leaflet';
import { fetchLocation } from '../../../utils/react-leaflet/fetchLocation';
import { createClient } from '@/utils/supabase/client';
import L from 'leaflet';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MoveEvent() {
  const supabase = createClient();
  const markersLayer = useRef(L.layerGroup());
  const router = useRouter();

  const [addedMarkers, setAddedMarkers] = useState<Set<string>>(new Set());

  const map = useMapEvents({
    moveend: async () => {
      const center = map.getCenter();
      const location = await fetchLocation(center.lat, center.lng);

      if (!location) return;

      if (map.getZoom() < 12) {
        markersLayer.current.clearLayers();
        setAddedMarkers(new Set());

        return;
      }

      const { data } = await supabase
        .from('posts')
        .select()
        .textSearch('keywords', location);

      if (!data) return;
      const newMarkers = new Set<string>(addedMarkers);

      data.map((point: any) => {
        const locationText = point.location.split(',');

        if (!newMarkers.has(point.location)) {
          const marker = L.marker([
            Number(locationText[0]),
            Number(locationText[1]),
          ]);

          marker.on('click', () => {
            router.replace(`/maps/${point.id}`);
          });

          newMarkers.add(point.location);
          setAddedMarkers(newMarkers);

          markersLayer.current.addLayer(marker);
        }
      });

      markersLayer.current.addTo(map);
    },
  });

  return null;
}
