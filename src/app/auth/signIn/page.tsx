'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

const BASEURL = process.env.NEXT_PUBLIC_BASEURL;

const SocialSignInPage = () => {
  const router = useRouter();

  const signInWithGoogle = () => {
    const signInUrl = `${BASEURL}/api/auth/google/login/dev`;
    router.push(signInUrl);
  };

  return (
    <div className="">
      <div className="flex flex-col">
        <div>
          <p>회원이 아니신가요?</p>&nbsp;
          <Link href={'/auth/signUp'}>회원가입</Link>
        </div>
        <button onClick={signInWithGoogle}>구글로 시작하기</button>
      </div>
    </div>
  );
};

export default SocialSignInPage;
