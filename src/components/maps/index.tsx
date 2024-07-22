import { MapContainer, TileLayer } from 'react-leaflet';
import Footer from '@/components/footer';
import 'leaflet/dist/leaflet.css';

export default function Map() {
  return (
    <div className="flex h-screen flex-col">
      <MapContainer
        center={[35.710067, 139.8081255]}
        zoom={13}
        className="flex-1"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.jp/styles/maptiler-basic-ja/{z}/{x}/{y}.png"
        />
      </MapContainer>
      <Footer />
    </div>
  );
}
