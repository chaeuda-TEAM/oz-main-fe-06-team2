'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

import useAuthStore from '@/stores/authStore';
import { useSearchParams } from 'next/navigation';
import { jwtDecrypt } from '@/utils/jwtDecrypt';
import SearchModal from '@/components/modals/SearchModal';

const NaverMap = dynamic(() => import('../components/NaverMap'), {
  loading: () => (
    <div className="flex w-full justify-center items-center h-screen bg-gray-100">
      <div className="flex w-full flex-col items-center">
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
  const { login } = useAuthStore();
  const searchParams = useSearchParams();
  const userData = searchParams.get('user');

  useEffect(() => {
    const fetchDecryptedUser = async () => {
      if (userData) {
        const decryptedUserData = await jwtDecrypt(userData);
        if (decryptedUserData) {
          login({...decryptedUserData, isSocialUser: true});
        } else {
          console.error('사용자 정보를 복호화할 수 없습니다.');
        }
      }
    };

    fetchDecryptedUser();
  }, [userData]);

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
