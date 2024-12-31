'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const GoogleCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    console.log('🔑 Google Auth Code:', code);

    if (code) {
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/google/callback/dev?code=${code}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
        .then(response => {
          console.log('📡 API Response:', {
            status: response.status,
            statusText: response.statusText
          });
          return response.json();
        })
        .then(data => {
          console.log('✅ Auth Success Data:', {
            success: data.success,
            user: data.user,
            tokens: {
              access: data.tokens?.access ? '존재함' : '없음',
              refresh: data.tokens?.refresh ? '존재함' : '없음'
            }
          });
          if (data.success) {
            fetch('/api/auth/setToken', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                accessToken: data.tokens.access,
                refreshToken: data.tokens.refresh,
              }),
            })
              .then(response => {
                if (response.ok) {
                  localStorage.setItem('user', JSON.stringify(data.user));
                  router.push('/');
                }
              })
              .catch(error => {
                console.error('토큰 설정 중 오류:', error);
              });
          }
        })
        .catch(error => {
          console.error('❌ 구글 로그인 에러:', {
            message: error.message,
            stack: error.stack
          });
        });
    }
  }, [router, searchParams]);

  return <div>로그인 처리 중...</div>;
};

export default GoogleCallback;
