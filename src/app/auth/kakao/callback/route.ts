import { NextRequest, NextResponse } from 'next/server';
import { jwtEncrypt } from '@/utils/jwtEncrypt';

const DEV_API_URL = process.env.NEXT_PUBLIC_DEV_API_URL;

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const code = searchParams.get('code');

    if (!code) {
      return NextResponse.json({ error: 'No code provided' }, { status: 400 });
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/kakao/callback/dev?code=${code}`,
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
      // 유저정보 암호화
      const userPayload = {
        email: data.user.email,
        username: data.user.username,
        phone_number: data.user.phone_number,
      };
      const encryptedUserPayloadJwt = await jwtEncrypt(userPayload, '1h');

      // 엑세스 토큰 암호화
      const accessTokenPayload = { token: data.tokens.access };
      const encryptedAccessTokenPayloadJwt = await jwtEncrypt(accessTokenPayload, '30m');

      // 리프레시 토큰 암호화
      const refreshTokenPayload = { token: data.tokens.refresh };
      const encryptedRefreshTokenPayloadJwt = await jwtEncrypt(refreshTokenPayload, '7d');

      const redirectUrl = data.user.is_active
        ? `${data.redirect_url}?user=${encryptedUserPayloadJwt}`
        : `${DEV_API_URL}/auth/signUp/social?user=${encryptedUserPayloadJwt}`;

      const responseObj = NextResponse.redirect(redirectUrl);

      if (data.user.is_active) {
        responseObj.cookies.set('accessToken', encryptedAccessTokenPayloadJwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 60 * 30,
        });

        responseObj.cookies.set('refreshToken', encryptedRefreshTokenPayloadJwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 60 * 60 * 24 * 7,
        });
      }

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
