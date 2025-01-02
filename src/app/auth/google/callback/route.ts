import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const code = searchParams.get('code');

    if (!code) {
      return NextResponse.json({ error: 'No code provided' }, { status: 400 });
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/google/callback/dev?code=${code}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      console.error('Backend request failed with status:', response.status);
      throw new Error('Failed to send code to backend');
    }

    const data = await response.json();

    if (data.success) {
      // is_active가 false일 경우 회원가입 페이지로, true일 경우 원래 리다이렉트 URL로 이동
      const redirectUrl = data.is_active ? data.redirect_url : `http://localhost:3000/auth/signUp`;

      const responseObj = NextResponse.redirect(redirectUrl);

      // 쿠키에 토큰 저장
      responseObj.cookies.set('accessToken', data.tokens.access, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 30, // 30분
      });

      responseObj.cookies.set('refreshToken', data.tokens.refresh, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7일
      });

      return responseObj;
    }

    return NextResponse.json(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
      });
    } else {
      console.error('Unknown error:', error);
    }
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
