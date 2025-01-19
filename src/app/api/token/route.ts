import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtDecrypt } from '@/utils/jwtDecrypt';

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get('accessToken');

  if (!token) {
    return NextResponse.json({ error: 'No token found' }, { status: 401 });
  }

  const decryptedAccess = await jwtDecrypt(token.value);

  if (decryptedAccess) {
    return NextResponse.json({ accessToken: decryptedAccess });
  }
}
