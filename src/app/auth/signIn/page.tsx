'use client';

import Link from 'next/link';
import React from 'react';

const page = () => {
  const loginWithGoogle = async (): Promise<void> => {
    console.log(1)
  }

  return (
    <div className="">
      <div className="flex flex-col">
        <div>
          <p>회원이 아니신가요?</p>&nbsp;
          <Link href={'/auth/signUp'}>회원가입</Link>
        </div>
        <button onClick={loginWithGoogle}>구글로 시작하기</button>
      </div>
    </div>
  );
};

export default page;
