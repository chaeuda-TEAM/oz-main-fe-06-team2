'use client';

import { useState } from 'react';
import NaverMap from '@/components/NaverMap';
import RegionFilterForm from '@/containers/forms/RegionFilter';
import { useState } from 'react';
import { ProductList } from './_compoenets/ProductList';
import { ProductDetailModal } from '../product/detail/[product_id]/modal';
import { Location } from '@/types/product';

const SearchPage = () => {

  // const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  // const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  // const handleRegionSelect = (location: Location) => {setSelectedLocation(location);

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
      <div className="w-[25%]">
        {selectedLocation ? (
          <ProductList location={selectedLocation} onProductClick={setSelectedProductId} />
        ) : (
          <div className=" flex items-center justify-center">
            원하시는 지역의 매물을 검색하세요.
          </div>
        )}
      </div>
      {selectedProductId && (
        <ProductDetailModal
          productId={selectedProductId}
          isOpen={true}
          onClose={() => setSelectedProductId(null)}
        />
      )}
    </div>
  );
};

export default SearchPage;
