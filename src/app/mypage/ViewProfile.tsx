'use client';

import { sendWithdrawRequest } from '@/api/auth';
import useAuthStore from '@/stores/authStore';
import { useRouter } from 'next/navigation';
import FormInput from '@/components/form/SocialSignUpFormInput';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SocialSignupFormData, SocialSignUpSchema } from '@/app/auth/schemas/SocialSignInSchema';
import { useEffect, useState } from 'react';

const ViewProfile = () => {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const { register, setValue } = useForm<SocialSignupFormData>({
    resolver: zodResolver(SocialSignUpSchema),
    defaultValues: {
      email: '',
      username: '',
    },
  });

  const inputField = [
    {
      label: '이메일 주소',
      id: 'email',
      type: 'email',
      name: 'email',
      disabled: true,
    },
    {
      label: '이름',
      id: 'username',
      type: 'text',
      name: 'username',
      disabled: true,
    },
    {
      label: '휴대폰번호',
      id: 'phone_number',
      type: 'phone',
      name: 'phone_number',
      disabled: true,
    },
  ];

  useEffect(() => {
    setValue('email', user?.email || '');
    setValue('username', user?.username || '');
    setValue('phone_number', user?.phone_number || '');
  }, [user, setValue]);

  const handleMyPageClick = () => {
    if (user) {
      setIsEditing(true);
      // router.push('/mypage/editMypage');
      return;
    }
  };

  // 회원 탈퇴 요청 함수
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
      <div className="flex flex-col w-[30%] h-full p-4 space-y-5">
        <div>
          <h1 className="text-2xl font-normal text-kick">마이페이지</h1>
        </div>
        {inputField.map(item => (
          <FormInput
            key={item.id}
            name={item.name as keyof SocialSignupFormData}
            label={item.label}
            id={item.id}
            type={item.type}
            register={register}
            disabled={item.disabled}
          />
        ))}
        <button onClick={handleMyPageClick} className="bg-kick w-full h-10 text-4 text-white">
          정보 수정
        </button>
        <button className="text-kick" onClick={handleWithdraw}>
          회원 탈퇴
        </button>
      </div>
  );
};

export default ViewProfile;
