interface Address {
  city?: string;
  suburb?: string;
}

interface Data {
  address?: Address;
}

export async function fetchLocation(lat: number, lng: number) {
  // reverse geocoding
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
  );
  const responseData: Data = await response.json();
  const address = responseData.address;

  let nowLocation = '';
  if (address) {
    nowLocation = `${address.city}${address.suburb}`;
  }

  return nowLocation.replace('undefined', '');
}
