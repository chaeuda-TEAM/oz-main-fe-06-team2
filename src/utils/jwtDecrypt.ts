import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;

export const jwtDecrypt = async (token: string): Promise<{ email: string; username: string; phone_number?: string } | null> => {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
    return payload as { email: string; username: string; phone_number?: string; };
  } catch (error) {
    console.error('JWT 복호화 오류:', error);
    return null;
  }
};