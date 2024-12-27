import { LoginResponse } from '@/types/types';

export const sendLoginRequest = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('API 요청 실패');
    }

    const data: LoginResponse = await response.json();
    return data;
  } catch (error) {
    console.error('로그인 요청 오류:', error);
    return {
      success: false,
      message: '로그인 요청에 실패했습니다.',
    };
  }
};
