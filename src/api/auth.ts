'use server';

import { LoginResponse, LogoutResponse, RefreshResponse } from '@/types/types';
import { cookies } from 'next/headers';
import { jwtEncrypt } from '@/utils/jwtEncrypt';
import { jwtDecrypt } from '@/utils/jwtDecrypt';

export const sendLoginRequest = async (email: string, password: string): Promise<LoginResponse> => {
  const cookieStore = await cookies();
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.status !== 200) {
      const errorData = await response.json();
      return {
        success: false,
        message: `${errorData.message}`,
      };
    }

    const data = await response.json();

    // 엑세스 토큰 암호화
    const accessTokenPayload = { token: data.tokens.access };
    const encryptedAccessTokenPayloadJwt = await jwtEncrypt(accessTokenPayload, '30m');

    // 리프레시 토큰 암호화
    const refreshTokenPayload = { token: data.tokens.refresh };
    const encryptedRefreshTokenPayloadJwt = await jwtEncrypt(refreshTokenPayload, '7d');

    cookieStore.set({
      name: 'accessToken',
      value: encryptedAccessTokenPayloadJwt,
      httpOnly: true,
    });

    cookieStore.set({
      name: 'refreshToken',
      value: encryptedRefreshTokenPayloadJwt,
      httpOnly: true,
    });

    return data;
  } catch (error) {
    console.error('로그인 요청 오류:', error);
    return {
      success: false,
      message: '로그인 실패했습니다. 이메일 비밀번호를 확인해주세요.',
    };
  }
};

export const sendRefreshTokenRequest = async (
  refresh: string | undefined,
): Promise<RefreshResponse> => {
  if (!refresh) {
    return {
      success: false,
      message: 'Refresh token이 없습니다.',
    };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${refresh}`,
      },
      body: JSON.stringify({ refresh }),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Refresh API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
      });

      return {
        success: false,
        message: `토큰 갱신 실패 (${response.status}): ${errorData.message || response.statusText}`,
      };
    }

    const data: RefreshResponse = await response.json();
    return data;
  } catch (error) {
    console.error('토큰 갱신 요청 오류:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : '토큰 갱신 요청에 실패했습니다.',
    };
  }
};

export const sendLogoutRequest = async (refresh: string): Promise<LogoutResponse> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refresh }),
    });

    if (!response.ok) {
      throw new Error('API 요청 실패');
    }

    const data: LogoutResponse = await response.json();
    return data;
  } catch (error) {
    console.error('로그아웃 요청 오류:', error);
    return {
      success: false,
      message: '로그아웃 요청에 실패했습니다.',
    };
  }
};

export const sendWithdrawRequest = async () => {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('accessToken');

    if (!accessToken) {
      throw new Error('인증 토큰이 없습니다. 다시 로그인 해주세요.');
    }

    const decryptedAccess = await jwtDecrypt(accessToken.value);

    if (decryptedAccess) {
      const withdrawResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/withdraw`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${decryptedAccess}`,
          },
        },
      );

      if (!withdrawResponse.ok) {
        throw new Error('엑세스 토큰이 인증되지 않았거나 API 요청에 실패했습니다.');
      }

      const data = await withdrawResponse.json();
      return data;
    } else {
      throw new Error('엑세스 토큰이 유효하지 않습니다.');
    }
  } catch (error) {
    console.error('회원 탈퇴 오류: ', error);
    return {
      success: false,
      message: '비밀번호 확인 후 재시도바랍니다.',
    };
  }
};

export const sendUpdateProfileRequest = async (data: object) => {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('accessToken');

    if (!accessToken) {
      throw new Error('인증 토큰이 없습니다. 다시 로그인 해주세요.');
    }

    const decryptedAccess = (await jwtDecrypt(accessToken.value));

    if (!decryptedAccess) {
      throw new Error('유효하지 않은 인증 토큰입니다. 다시 로그인 해주세요.');
    }

    const updateProfileResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/update-profile`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${decryptedAccess.token}`,
        },
        body: JSON.stringify(data),
      },
    );

    if (!updateProfileResponse.ok) {
      const errorData = await updateProfileResponse.json();
      throw new Error(errorData.message || '프로필 업데이트에 실패했습니다.');
    }

    const getProfileResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${decryptedAccess.token}`,
      },
    });

    if (!getProfileResponse.ok) {
      const errorData = await updateProfileResponse.json();
      throw new Error(errorData.message || '업데이트된 유저정보를 가져오는데 실패했습니다.');
    }

    const response = await getProfileResponse.json();

    return response;
  } catch (error) {
    if (error instanceof Error) {
      console.error('프로필 업데이트 오류:', error.message);

      return {
        success: false,
        message: error.message || '알 수 없는 오류가 발생했습니다. 다시 시도해주세요.',
      };
    }

    console.error('예기치 못한 오류 발생:', error);

    return {
      success: false,
      message: '알 수 없는 오류가 발생했습니다. 다시 시도해주세요.',
    };
  }
};
