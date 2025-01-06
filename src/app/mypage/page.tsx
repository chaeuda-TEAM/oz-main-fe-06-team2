'use client';

import useAuthStore from '@/stores/authStore';

const MyPage = () => {
  const { user } = useAuthStore();

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-3xl font-light text-kick mb-4">마이페이지</h2>
      <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
      <p className="mb-4 p-2 bg-gray-100 border border-gray-300 rounded text-gray-600">
        {user?.email || '이메일 정보 없음'}
      </p>

      <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
      <p className="mb-4 p-2 bg-gray-100 border border-gray-300 rounded text-gray-600">
        {user?.username || '이름 정보 없음'}
      </p>

      <label className="block text-sm font-medium text-gray-700 mb-1">전화번호</label>
      <p className="mb-6 p-2 bg-gray-100 border border-gray-300 rounded text-gray-600">
        {user?.phone_number || '전화번호 정보 없음'}
      </p>

      <button className="w-full py-2 bg-kick text-white font-semibold">정보 수정</button>
      <hr className="my-6 border-gray-300" />
      <button className="float-end text-kick">회원 탈퇴</button>
    </div>
  );
};

export default MyPage;
