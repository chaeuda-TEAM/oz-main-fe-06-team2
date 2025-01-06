import { NextRequest, NextResponse } from 'next/server';
import { sendLogoutRequest } from '@/api/auth';
import {cookies } from 'next/headers';

export async function GET(req: NextRequest) {
    // const response = NextResponse.next()
    const cookieStore = cookies()
    const refreshToken = cookieStore.get('refreshToken')

    if (refreshToken) {
        const response = await sendLogoutRequest(refreshToken.value);
        if (response.success) {
        //   logout();
          // clearAuthCookies(); 
          // deleteCookie('accessToken');
          // deleteCookie('refreshToken');
          cookies().delete('accessToken')
          cookies().delete('refreshToken')
          console.log('로그아웃 성공');
        } else {
          console.error('로그아웃 요청 실패:', response.message);
        }
      }
    // return response;
}
