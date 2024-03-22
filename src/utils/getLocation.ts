import { useState, useEffect } from "react";

interface Location {
  latitude: number;
  longitude: number;
}

interface UseClientResult {
  location: Location | null;
  error: string | null;
  address: string | null; // Add address property
}

const useClient = (): UseClientResult => {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null); // Initialize address state

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        getAddressFromCoordinates(latitude, longitude);
      },
      (err) => {
        setError(`Error: ${err.message}`);
      }
    );
  }, []);

  async function getAddressFromCoordinates(
    latitude: number,
    longitude: number
  ) {
    const apiKey = "v4i0NxdOOjq1CawlFavbiV1ig7Ter0U1b6U92LI0-Ik"; // Add your HERE API key here
    const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude},${longitude}&apiKey=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
       const fullAddress = data?.items?.[0]?.address?.label;
       if (fullAddress) {
         const parts = fullAddress.split(",");
         const formattedAddress =
           parts.length > 1 ? parts[1].trim() : fullAddress;
         setAddress(formattedAddress);
       } else {
         setAddress("Address not found");
       }
     } catch (error) {
       console.error("Error fetching address:", error);
       setAddress("Error fetching address");
     }

  }

  return { location, error, address }; 
};

export default useClient;
