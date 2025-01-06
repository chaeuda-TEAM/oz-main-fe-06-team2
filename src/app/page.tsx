'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import SearchModal from '../components/SearchModal';

const NaverMap = dynamic(() => import('../components/NaverMap'), {
  loading: () => (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
        <p className="mt-4 text-lg text-gray-600">로딩 중입니다...</p>
      </div>
    </div>
  ),
  ssr: false,
});

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [topSearchInput, setTopSearchInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTopSearchInput(true);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="relative">
      <NaverMap
        topSearchInput={topSearchInput}
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
      />
      <SearchModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        handleSearchChange={handleSearchChange}
      />
    </div>
  );
};

export default Home;
