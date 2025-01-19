import { EncryptJWT, JWTPayload } from 'jose';

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;

export const jwtEncrypt = async (data: JWTPayload, expiration: string) => {
  try {
    const encryptedJwt = await new EncryptJWT(data)
      .setProtectedHeader({ alg: 'dir', enc: 'A128CBC-HS256' })
      .setIssuedAt()
      .setExpirationTime(expiration)
      .encrypt(new TextEncoder().encode(JWT_SECRET));

    return encryptedJwt;
  } catch (error) {
    console.error('JWT 암호화 오류:', error);
    throw new Error('JWT 암호화 실패');
  }
};