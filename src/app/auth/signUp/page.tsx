'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BASEURL } from '@/constants/apiUrls';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignupFormData, FormSchema } from '../schemas/FormSchema';
import FormInput from '@/components/form/FormInput';

const LocalSignUpPage = () => {
  const router = useRouter();
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  // 버튼 비활성화화
  const [emailVerificationSent, setEmailVerificationSent] = useState(false);
  // 이메일 인증 버튼 클릭 후 문구구
  const [verificationEmailMessage, setVerificationEmailMessage] = useState('');
  const [verificationCodeMessage, setVerificationCodeMessage] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(FormSchema),
    mode: 'onBlur',
  });

  const inputField = [
    {
      label: '이름',
      id: 'username',
      type: 'text',
      name: 'username',
    },
    // {
    //   label: '아이디',
    //   id: 'user_id',
    //   type: 'text',
    //   name: 'user_id',
    // },
    {
      label: '비밀번호',
      id: 'password',
      type: 'password',
      name: 'password',
    },
    {
      label: '비밀번호 확인',
      id: 'password_confirm',
      type: 'password',
      name: 'password_confirm',
    },
    {
      label: '휴대폰번호',
      id: 'phone_number',
      type: 'number',
      name: 'phone_number',
    },
  ];

  const email = watch('email');

  // 이메일 인증 코드 전송
  const sendEmailVerificationCode = async (): Promise<void> => {
    try {
      const response = await fetch(`${BASEURL}/api/users/request-email-verification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setEmailVerificationSent(true);
        setVerificationEmailMessage(data.message);
      }
    } catch (error) {
      alert(`인증번호 전송 실패: ${error}`);
    }
  };

  // 이메일 인증 코드 검증
  const verifyEmailVerificationCode = async (): Promise<void> => {
    const verificationCode = watch('email_verificationCode');

    try {
      const response = await fetch(`${BASEURL}/api/users/verify-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: verificationCode }),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.message === '유효하지 않은 인증번호입니다.') {
          setVerificationCodeMessage('인증번호를 다시 입력해주세요.');
          return;
        } else {
          setVerificationCodeMessage('인증이 완료되었습니다.');
          setVerificationEmailMessage('');
        }
        setIsEmailVerified(true);
      }
    } catch (error) {
      alert(`이메일 인증 실패: ${error}`);
    }
  };

  // 최종 회원가입
  const onSubmit = async (data: SignupFormData): Promise<void> => {
    if (!isEmailVerified) {
      alert('이메일 인증을 완료해주세요.');
      return;
    }

    try {
      const response = await fetch(`${BASEURL}/api/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        alert('회원가입 성공! 로그인 페이지로 이동합니다.');
        router.push('/');
      }
    } catch (error) {
      alert(`회원가입 실패: ${error}`);
    }
  };

  return (
    <div className="p-[50px] w-full h-full flex justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-[460px] space-y-3.5">
        {/* 이메일, 인증번호 제외 인풋들 */}
        {inputField.map(item => (
          <FormInput
            key={item.id}
            {...item}
            register={register}
            errorMessage={errors[item.name as keyof SignupFormData]?.message}
          />
        ))}

        {/* 이메일 주소 인풋 */}
        <div className="flex flex-col space-y-1.5">
          <label htmlFor="email">이메일 주소</label>
          <div className="flex space-x-2 w-full">
            <input
              id="email"
              type="email"
              {...register('email')}
              className="flex-grow border border-gray-400 w-[350px] h-[35px] p-2"
            />
            <button
              type="button"
              onClick={sendEmailVerificationCode}
              disabled={!email || emailVerificationSent}
              className="border border-gray-500 w-[100px] h-[35px] text-[15px] cursor-pointer"
            >
              이메일 인증
            </button>
          </div>
          {verificationEmailMessage && (
            <p className="text-green-600 text-sm">{verificationEmailMessage}</p>
          )}
          {errors.email && <p className="text-kick text-sm">{errors.email.message}</p>}
        </div>

        {/* 이메일 인증번호 인풋 */}
        <div className="flex flex-col space-y-1.5">
          <label htmlFor="authenticateEmail">이메일 인증번호</label>
          <div className="flex space-x-2">
            <input
              id="authenticateEmail"
              type="number"
              {...register('email_verificationCode')}
              className="border border-gray-400 w-[350px] h-[35px] p-2"
              disabled={!emailVerificationSent}
            />
            <button
              type="button"
              onClick={verifyEmailVerificationCode}
              disabled={!emailVerificationSent}
              className="border border-gray-500 w-[100px] h-[35px] text-[15px] cursor-pointer"
            >
              인증번호 확인
            </button>
          </div>
          {verificationCodeMessage && (
            <p className="text-green-600 text-sm">{verificationCodeMessage}</p>
          )}
          {errors.email_verificationCode && (
            <p className="text-kick text-sm">{errors.email_verificationCode.message}</p>
          )}
        </div>

        <button type="submit" className="bg-kick w-[350px] h-[40px] text-white mt-[340px]">
          회원가입
        </button>
      </form>
    </div>
  );
};

export default LocalSignUpPage;
