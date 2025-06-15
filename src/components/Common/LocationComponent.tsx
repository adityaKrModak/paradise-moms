"use client";

import Image from "next/image";
import mapicon from "@/assets/Map Pin.svg";
import GetLocation from "@/utils/getLocation";

const LocationComponent: React.FC = () => {
  const { location, error,address } = GetLocation();

  return (
    <div className="bg-[#333333] text-[#B3B3B3] py-1 hidden sm:block">
      {error && <p>{error}</p>}
      {location && (
        <div className="flex gap-2 ms-12 text-sm">
          <Image className="w-[15px]" src={mapicon} alt="mapicon" /> {address}
        </div>
      )}
    </div>
  );
};

export default LocationComponent;
