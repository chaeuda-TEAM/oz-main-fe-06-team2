'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import SearchModal from '../components/SearchModal';
import useAuthStore from '@/stores/authStore';

const NaverMap = dynamic(() => import('../components/NaverMap'), { ssr: false });

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [topSearchInput, setTopSearchInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { socialLogin } = useAuthStore();

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTopSearchInput(true);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts === undefined) return;
      if (parts.length === 2) {
        const cookieValue = parts.pop();
        if (cookieValue) {
          return cookieValue.split(';').shift();
        }
      }
      return null;
    };

    const userInfo = getCookie('user');
    if (userInfo) {
      const decodedUserInfo = JSON.parse(decodeURIComponent(userInfo));
      socialLogin(decodedUserInfo);
      console.log(decodedUserInfo);
    } else {
      console.log('사용자 정보가 없습니다.');
    }
  }, []);

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
