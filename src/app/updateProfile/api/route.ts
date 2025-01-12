'use server';

import { NextRequest, NextResponse } from 'next/server';
import { sendRefreshTokenRequest } from '@/api/auth';

export const POST = async (
  req: NextRequest
): Promise<NextResponse> => {
  try {
    // 1. 요청에서 사용자 정보 받기
    const userProfileData = await req.json();

    // 2. 리프레시 토큰 가져오기
    const refreshToken = req.cookies.get('refreshToken')?.value;
    
    if (!refreshToken) {
      return NextResponse.json({ success: false, message: '리프레시 토큰이 없습니다.' });
    }

    // 3. 리프레시 토큰으로 엑세스 토큰 갱신
    const refreshResponse = await sendRefreshTokenRequest(refreshToken);

    if (!refreshResponse.success || !refreshResponse.tokens?.access) {
      return NextResponse.json({ success: false, message: '엑세스 토큰 갱신 실패' });
    }

    const accessToken = refreshResponse.tokens.access;

    // 4. 갱신된 엑세스 토큰을 Authorization 헤더에 넣어 사용자 정보 수정
    const updateResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/update-profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`, // 엑세스 토큰을 Authorization 헤더에 추가
      },
      body: JSON.stringify(userProfileData),
    });

    if (updateResponse.status !== 200) {
      const errorData = await updateResponse.json();
      return NextResponse.json({ success: false, message: errorData.message || '회원정보 수정 실패' });
    }

    const updatedResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`, // 엑세스 토큰을 Authorization 헤더에 추가
      },
    });

    const data = await updatedResponse.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('API 요청 중 에러 발생:', error);
    return NextResponse.json({
      success: false,
      message: '서버에서 에러가 발생했습니다.',
    });
  }
};
