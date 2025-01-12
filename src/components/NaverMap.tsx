'use client';

import { useEffect, useRef, useState } from 'react';

interface NaverMapProps {
  topSearchInput?: boolean;
  initialCenter: { lat: number; lng: number };
  initialZoom?: number;
}

const NaverMap: React.FC<NaverMapProps> = ({
  topSearchInput = true,
  initialCenter,
  initialZoom = 14,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current) return;

    const initializeMap = () => {
      if (!window.naver || !mapRef.current) return;

      const mapOptions = {
        center: new window.naver.maps.LatLng(initialCenter.lat, initialCenter.lng),
        zoom: initialZoom,
        zoomControl: false,
      };

      const newMap = new window.naver.maps.Map(mapRef.current, mapOptions);
      setMap(newMap);
    };

    if (!window.naver) {
      const script = document.createElement('script');
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`;
      script.async = true;
      script.onload = initializeMap;
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    } else {
      initializeMap();
    }
  }, []);

  useEffect(() => {
    if (map) {
      const newCenter = new window.naver.maps.LatLng(initialCenter.lat, initialCenter.lng);
      map.setCenter(newCenter);
    }
  }, [initialCenter, map]);

  return (
    <div className="relative">
      <div ref={mapRef} className="w-full h-[700px]"></div>
    </div>
  );
};

export default NaverMap;
