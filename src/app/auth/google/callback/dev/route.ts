import { NextRequest, NextResponse } from 'next/server';
const BASEURL = process.env.NEXT_PUBLIC_BASEURL;

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const code = searchParams.get('code');
    console.log(code)
    
    if (!code) {
      return NextResponse.json({ error: 'No code provided' }, { status: 400 });
    }

    // 백엔드 API로 코드 전달
    const response = await fetch(`${BASEURL}/api/auth/google/callback/dev?code=${code}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error('Failed to send code to backend');
    }

    // 백엔드에서 받은 응답에 따라 적절한 페이지로 리다이렉트
    return NextResponse.redirect(`/`);
    
  } catch (error) {
    console.error('Error in callback:', error);
    return 
  }
}