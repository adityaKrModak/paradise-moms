'use client'
import React, { useState, useEffect } from 'react';

const LocationComponent: React.FC = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null); // State to hold the address

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });

        // Fetch address after getting location
        getAddressFromCoordinates(latitude, longitude);
      },
      (err) => {
        setError(`Error: ${err.message}`);
      }
    );
  }, []);

  async function getAddressFromCoordinates(latitude: number, longitude: number) {
    const apiKey = 'v4i0NxdOOjq1CawlFavbiV1ig7Ter0U1b6U92LI0-Ik'; // Add your HERE API key here
    const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude},${longitude}&apiKey=${apiKey}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      // Extract the address from the response
      const fullAddress = data?.items?.[0]?.address?.label;
      if (fullAddress) {
        // Split the address by comma and take the second part
        const parts = fullAddress.split(',');
        const formattedAddress = parts.length > 1 ? parts[1].trim() : fullAddress;
        setAddress(formattedAddress);
      } else {
        setAddress('Address not found');
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      setAddress('Error fetching address');
    }
  }

  return (
    <div className='bg-[#333333] text-[#B3B3B3] py-1  '>
      {error && <p>{error}</p>}
      {location && (
        <p>
          Location: {address}
        </p>
      )}
    </div>
  );
};

export default LocationComponent;
