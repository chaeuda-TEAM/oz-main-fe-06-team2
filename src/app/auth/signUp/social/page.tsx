'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignupFormData, FormSchema } from '@/app/auth/schemas/FormSchema';
import FormInput from '@/components/form/FormInput';
import FormButton from '@/components/form/FormButton';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const DEV_API_URL = process.env.NEXT_PUBLIC_DEV_API_URL;

const LocalSignUpPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(FormSchema),
    mode: 'onBlur',
  });

  const inputField = [
    {
      label: '이메일 주소',
        id: 'email',
        type: 'email',
        name: 'email',
      },
    {
      label: '이름',
      id: 'username',
      type: 'text',
      name: 'username',
    },
    {
      label: '휴대폰번호',
      id: 'phone_number',
      type: 'number',
      name: 'phone_number',
    },
  ];

  // 최종 회원가입
  const onSubmit = async (data: SignupFormData): Promise<void> => {

    try {
      const response = await fetch(`${BASE_URL}/api/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.status !== 200) return;

      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        alert('회원가입 성공! 로그인 페이지로 이동합니다.');
        router.push(`${DEV_API_URL}/auth/signIn`);
      }
    } catch (error) {
      alert(`회원가입 실패: ${error}`);
    }
  };

  return (
    <div className="pt-9 pb-9 w-full h-full flex justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-[80%] sm:w-1/3 space-y-5">

        {inputField.map(item => (
          <FormInput
            key={item.id}
            name={item.name as keyof SignupFormData}
            label={item.label}
            id={item.id}
            type={item.type}
            register={register}
            errorMessage={errors[item.name as keyof SignupFormData]?.message}
          />
        ))}

        <FormButton>회원가입</FormButton>
      </form>
    </div>
  );
};

export default LocalSignUpPage;
