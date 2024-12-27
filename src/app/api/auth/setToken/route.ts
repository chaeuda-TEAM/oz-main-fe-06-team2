import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { accessToken, refreshToken } = await req.json();

  if (!accessToken || !refreshToken) {
    return NextResponse.json(
      { success: false, message: 'Access Token 또는 Refresh Token이 누락되었습니다.' },
      { status: 400 },
    );
  }
  const response = NextResponse.json({ success: true, message: 'Token이 설정되었습니다.' });
  response.cookies.set({
    name: 'accessToken',
    value: accessToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 30, // 30분
  });

  response.cookies.set({
    name: 'refreshToken',
    value: refreshToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7일
  });

  return response;
}
