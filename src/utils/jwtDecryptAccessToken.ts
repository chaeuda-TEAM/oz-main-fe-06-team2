import { compactDecrypt } from 'jose';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;

export const jwtDecryptAccessToken = async (req: NextRequest) => {
  try {
    const encryptedAccessToken = req.cookies.get('accessToken')?.value;

    if (!encryptedAccessToken) {
      console.error('Access token이 존재하지 않습니다.');
      return null;
    }

    const decrypted = await compactDecrypt(encryptedAccessToken, new TextEncoder().encode(JWT_SECRET));

    const decryptedData = JSON.parse(new TextDecoder().decode(decrypted.plaintext));

    return decryptedData;
  } catch (error) {
    console.error('JWT 복호화 오류:', error);
    return null;
  }
};
