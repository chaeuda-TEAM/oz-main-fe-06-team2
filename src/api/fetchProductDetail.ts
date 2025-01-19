'use server';

import { cookies } from 'next/headers';
import { jwtDecrypt } from '@/utils/jwtDecrypt';

export const fetchProductDetail = async (productId: number) => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (accessToken) {
    const decryptedAccess = await jwtDecrypt(accessToken);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/detail/${productId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${decryptedAccess}`,
        },
        cache: 'no-store',
      },
    );

    if (!response.ok) throw new Error('API 요청 실패');
    const data = await response.json();
    console.log('상품 정보:', data);

    return data;
  }
};
