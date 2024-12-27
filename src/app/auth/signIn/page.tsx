'use client';

import { sendLoginRequest } from '@/api/auth';
import FormButton from '@/components/form/FormButton';
import Link from 'next/link';
import React, { useState } from 'react';

const SignIn = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState<string | null>(null);

  const onSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessages(null);

    const data = await sendLoginRequest(email, password);

    if (data.success) {
      console.log('로그인 성공:', data);
      // TODO : Token을 쿠키에 저장?
    } else {
      console.error('로그인 실패:', data);
      setErrorMessages(data.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-sm p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">로그인</h1>
        <form className="mt-6" onSubmit={onSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              이메일
            </label>
            <input
              type="email"
              id="email"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={event => setEmail(event.target.value)}
              className="w-full px-4 py-2 mt-2 border focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={event => setPassword(event.target.value)}
              className="w-full px-4 py-2 mt-2 border focus:outline-none"
              required
            />
          </div>
          {errorMessages && <p className="mb-2 text-sm text-red-500">{errorMessages}</p>}
          <FormButton>{loading ? '로그인 중...' : '로그인'}</FormButton>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            회원이 아니신가요?{' '}
            <Link href="/auth/signUp" className="border-b-2 border-gray-600">
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
