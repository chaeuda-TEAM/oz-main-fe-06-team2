import { FirstSelectRegion, SecondSelectRegion } from '@/constants/region';
import { useState, useEffect } from 'react';

interface RegionFilterFormProps {
  onRegionChange: (lat: number, lng: number) => void;
}

const RegionFilterForm: React.FC<RegionFilterFormProps> = ({ onRegionChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('default');
  const [selectedRegion, setSelectedRegion] = useState('');

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedRegion('');
  };

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
    const selectedOption = SecondSelectRegion[selectedCategory].find(item => item.value === region);
    if (selectedOption && selectedOption.lat && selectedOption.lng) {
      onRegionChange(selectedOption.lat, selectedOption.lng);
    }
  };

  const selectedOptions = SecondSelectRegion[selectedCategory] || [];

  useEffect(() => {
    if (selectedOptions.length > 0 && !selectedRegion) {
      handleRegionChange(selectedOptions[0].value);
    }
  }, [selectedCategory, selectedOptions]);

  return (
    <form className="mb-3 space-x-3">
      <select
        className="w-[140px] p-[10px] text-[0.8rem] bg-[#f4f4f4]"
        onChange={e => handleCategoryChange(e.target.value)}
        value={selectedCategory}
      >
        {FirstSelectRegion.map(item => (
          <option key={item.value} value={item.value}>
            {item.name}
          </option>
        ))}
      </select>

      <select
        className="w-[140px] p-[10px] text-[0.8rem] bg-[#f4f4f4]"
        onChange={e => handleRegionChange(e.target.value)}
        value={selectedRegion}
      >
        {selectedOptions.map(item => (
          <option key={item.value} value={item.value}>
            {item.name}
          </option>
        ))}
      </select>
    </form>
  );
};

export default RegionFilterForm;
