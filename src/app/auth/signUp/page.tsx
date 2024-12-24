'use client';

import { useRouter } from 'next/navigation';
import { BASEURL } from '@/constants/apiUrls';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignupFormData, signupSchema } from '@/schemas/formSchemas';

const LocalSignUpPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const sendEmailVerificationCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = e.target.email.value;

    try {
      const response = await fetch(`${BASEURL}/api/users/request-email-verification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        alert('입력하신 이메일로 인증번호를 보냈습니다.');
      }
    } catch (error) {
      alert(`인증번호 전송 실패: ${error}`);
    }
  };

  const verifyEmailVerificationCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const verificationCode = e.target.authenticateEmail.value;
    const email = e.target.email.value;

    try {
      const response = await fetch(`${BASEURL}/api/users/verify-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: verificationCode }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        alert('이메일 인증을 완료했습니다.');
      }
    } catch (error) {
      alert(`이메일 인증에 실패했습니다.: ${error}`);
    }
  };

  const onSubmit = async (data: SignupFormData) => {
    // 모든 입력된 데이터가 콘솔에 출력됩니다.
    console.log(data);

    if (data.password !== data.password_confirm) {
      alert(`비밀번호가 `)
      return;
    }

    try {
      const response = await fetch(`${BASEURL}/api/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        alert('회원가입 성공! 로그인 페이지로 이동합니다.');
        router.push('/');
      }
    } catch (error) {
      alert(`회원가입 실패: ${error}`);
    }
  };

  return (
    <div className="p-[100px]">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-[300px]">
        <label htmlFor="username">이름</label>
        <input
          id="username"
          type="text"
          {...register('username')}
          className="border border-black"
        />
        {errors.username && <p>{errors.username.message}</p>}

        <label htmlFor="user_id">아이디</label>
        <input
          id="user_id"
          type="text"
          {...register('user_id')}
          className="border border-black"
        />
        {errors.user_id && <p>{errors.user_id.message}</p>}

        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          type="password"
          {...register('password')}
          className="border border-black"
        />
        {errors.password && <p>{errors.password.message}</p>}

        <label htmlFor="password_confirm">비밀번호 확인</label>
        <input
          id="password_confirm"
          type="password"
          {...register('password_confirm')}
          className="border border-black"
        />
        {errors.password_confirm && <p>{errors.password_confirm.message}</p>}

        <label htmlFor="phone_number">휴대폰번호</label>
        <input
          id="phone_number"
          type="number"
          {...register('phone_number')}
          className="border border-black"
        />
        {errors.phone_number && <p>{errors.phone_number.message}</p>}

        <label htmlFor="email">이메일 주소</label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className="border border-black"
        />
        {errors.email && <p>{errors.email.message}</p>}
        <button type="button" onClick={sendEmailVerificationCode}>
          이메일 인증
        </button>

        <label htmlFor="authenticateEmail">이메일 인증번호</label>
        <input
          id="authenticateEmail"
          type="number"
          {...register('email_verificationCode')}
          className="border border-black"
        />
        {errors.email_verificationCode && <p>{errors.email_verificationCode.message}</p>}
        <button type="button" onClick={verifyEmailVerificationCode}>
          인증번호 확인
        </button>

        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default LocalSignUpPage;
