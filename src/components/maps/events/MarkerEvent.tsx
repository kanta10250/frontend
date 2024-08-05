import { useMapEvent } from 'react-leaflet';
import L from 'leaflet';
import { useMarkerContext } from '@/context/markerContext';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

interface Address {
  city?: string;
  suburb?: string;
}

interface Data {
  address?: Address;
}

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

export default function MarkerEvent() {
  const { markerState, nowLocation, setMarkerState, setNowLocation } =
    useMarkerContext();

  const map = useMapEvent('click', async (location) => {
    if (markerState) {
      map.removeLayer(markerState);
    }

    const marker = L.marker(location.latlng).addTo(map);

    setMarkerState(marker);

    const lat = location.latlng.lat;
    const lng = location.latlng.lng;

    // reverse geocoding
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
    );
    const data: Data = await response.json();
    const address = data.address;

    if (address) {
      setNowLocation(`${address.city}${address.suburb}`);
    }
  });

  return null;
}
