'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import SearchModal from '@/components/modals/SearchModal';
import useAuthStore from '@/stores/authStore';
import { useSearchParams } from 'next/navigation';
import { jwtDecrypt } from '@/utils/jwtDecrypt';

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
  const { socialLogin } = useAuthStore();
  const [initialCenter, setInitialCenter] = useState({ lat: 37.5656, lng: 126.9769 });

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTopSearchInput(true);
  };

  const searchParams = useSearchParams();
  const user = searchParams.get('user');

  useEffect(() => {
    const fetchDecryptedUser = async () => {
      if (user) {
        const userData = await jwtDecrypt(user);
        if (userData) {
          socialLogin(userData);
        } else {
          console.error('사용자 정보를 복호화할 수 없습니다.');
        }
      }
    };

    fetchDecryptedUser();
  }, [user, socialLogin]);

  return (
    <div className="relative">
      <NaverMap topSearchInput={topSearchInput} initialCenter={initialCenter} initialZoom={13} />
      <SearchModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default Home;
