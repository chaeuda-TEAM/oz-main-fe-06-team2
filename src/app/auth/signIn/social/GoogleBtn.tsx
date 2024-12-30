'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
const BASEURL = process.env.NEXT_PUBLIC_BASEURL;

const Page = () => {
    const router = useRouter();

  const signInWithGoogle = async (): Promise<void> => {
    router.push(`${BASEURL}/api/auth/google/login/dev`)
  }
  
  return (
    <>
        <button onClick={signInWithGoogle}>구글로 시작하기</button>
    </>
  );
};

export default Page;