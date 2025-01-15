'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { sendWithdrawRequest } from '@/api/auth';
import useAuthStore from '@/stores/authStore';
import Profile from './profile/page';
import LikeProductsPage from './likeproducts/page';
import MyProductsPage from './myproducts/page';
import ChattingList from './chattingList/page';

const MyPage = () => {
  const router = useRouter();
  const { logout } = useAuthStore();
  const [myPageView, setMyPageView] = useState<keyof typeof pageComponents>('Profile');

  const pageComponents = {
    Profile: <Profile />,
    likeproducts: <LikeProductsPage />,
    myProductsPage: <MyProductsPage />,
    chattingList: <ChattingList />,
  };

  const handleWithdraw = async () => {
    const confirmed = confirm('정말로 회원 탈퇴를 진행하시겠습니까?');
    if (!confirmed) return;
    try {
      const withdrawResponse = await sendWithdrawRequest();

      if (!withdrawResponse) {
        console.log('탈퇴 에러');
      }

      const logoutResponse = await fetch(`/auth/logout/api`);

      if (!logoutResponse.ok) {
        console.log('에러');
      }

      logout();
      router.push('/');
      console.log('회원 탈퇴 성공');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex w-full h-full">
      <div className="border border-[#e5e7eb] w-40 flex justify-center p-6">
        <div className="flex flex-col justify-between">
          <ul className="space-y-4">
            <li onClick={() => setMyPageView('Profile')} className="cursor-pointer">
              마이페이지
            </li>
            <li onClick={() => setMyPageView('likeproducts')} className="cursor-pointer">
              찜한 방
            </li>
            <li onClick={() => setMyPageView('myProductsPage')} className="cursor-pointer">
              나의 매물
            </li>
            <li onClick={() => setMyPageView('chattingList')} className="cursor-pointer">
              채팅 목록
            </li>
          </ul>
          <span onClick={handleWithdraw} className="text-gray-400 text-sm cursor-pointer">
            회원 탈퇴
          </span>
        </div>
      </div>

      <div className="flex justify-center items-center w-full">{pageComponents[myPageView]}</div>
    </div>
  );
};

export default MyPage;
