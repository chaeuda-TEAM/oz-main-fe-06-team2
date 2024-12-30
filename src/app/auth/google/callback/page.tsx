'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const GoogleCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    console.log(code);

    if (code) {
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/google/callback/dev?code=${code}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
        // TODO: 토큰 쿠키에 저장하기
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            localStorage.setItem('accessToken', data.tokens.access);
            localStorage.setItem('refreshToken', data.tokens.refresh);
            localStorage.setItem('user', JSON.stringify(data.user));

            router.push('/');
          }
        })
        .catch(error => {
          console.error('로그인 처리 중 오류 발생:', error);
        });
    }
  }, [router]);

  return <div>콜백 말 개같이 안듣는중</div>;
};

export default GoogleCallback;
