// 'use server';
'use client';

import { NextRequest, NextResponse } from 'next/server';
import useAccessToken from '@/hooks/useAccessToken';

export const POST = async (
  req: NextRequest
): Promise<NextResponse> => {
  try {
    const userProfileData = await req.json();
    const accessToken = useAccessToken();

    const updateResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/update-profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
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
        Authorization: `Bearer ${accessToken}`,
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
