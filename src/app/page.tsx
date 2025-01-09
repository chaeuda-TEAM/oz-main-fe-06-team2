'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import SearchModal from '../components/SearchModal';
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
  const [searchQuery, setSearchQuery] = useState('');
  const { socialLogin, socialUser } = useAuthStore();

  useEffect(() => {
    console.log(socialUser);
  }, [])

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTopSearchInput(true);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const searchParams = useSearchParams();
  const user = searchParams.get('user');

  useEffect(() => {
    const fetchDecryptedUser = async () => {
      if (user) {
        const userData = await jwtDecrypt(user);
        if (userData) {
          console.log(userData);
          // 주스탠드에 소셜유저정보 안들어감
          // 프론트 url에서는 유저정보가 안들어옴
          // 토큰 암호화해서 쿠키에 저장해야됌;;;;;;;;
          socialLogin(userData);
        } else {
          console.error('사용자 정보를 복호화할 수 없습니다.');
        }
      }
    };

    fetchDecryptedUser();
  }, [user]);

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
