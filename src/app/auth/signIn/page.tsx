import Link from 'next/link';
import React from 'react';

const page = () => {
  return (
    <div className="">
      <div className='flex'>
        <p>회원이 아니신가요?</p>&nbsp;
        <Link href={'/auth/signUp'}>회원가입</Link>
      </div>
    </div>
  );
};

export default page;
