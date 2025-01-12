'use client';

import { useState } from 'react';
import NaverMap from '@/components/NaverMap';
import RegionFilterForm from '@/containers/forms/RegionFilter';

const SearchPage = () => {
  const [selectedRegion, setSelectedRegion] = useState({ lat: 37.5656, lng: 126.9769 });

  const handleRegionChange = (lat: number, lng: number) => {
    setSelectedRegion({ lat, lng });
  };

  return (
    <div className="flex p-5">
      <div className="flex-1">
        <RegionFilterForm onRegionChange={handleRegionChange} />
        <NaverMap topSearchInput={false} initialCenter={selectedRegion} initialZoom={14} />
      </div>
      <div className="w-[25%] flex items-center justify-center">
        원하시는 지역의 매물을 검색하세요.
      </div>
    </div>
  );
};

export default SearchPage;
