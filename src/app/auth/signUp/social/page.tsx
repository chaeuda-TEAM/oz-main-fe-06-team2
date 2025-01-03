// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { SignupFormData, FormSchema } from '@/app/auth/schemas/FormSchema';
// import FormInput from '@/components/form/FormInput';
// import FormButton from '@/components/form/FormButton';
// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
// const DEV_API_URL = process.env.NEXT_PUBLIC_DEV_API_URL;

// const SocialSignUpPage = () => {
//   const router = useRouter();

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm<SignupFormData>({
//     resolver: zodResolver(FormSchema),
//     mode: 'onBlur',
//     defaultValues: {
//       email: '',
//       username: '',
//     },
//   });

//   useEffect(() => {
//     const getCookie = (name: string) => {
//       const value = `; ${document.cookie}`;
//       const parts = value.split(`; ${name}=`);
//       if (parts === undefined) return;
//       if (parts.length === 2) {
//         const cookieValue = parts.pop();
//         if (cookieValue) {
//           return cookieValue.split(';').shift();
//         }
//       }
//       return null;
//     };

//     const userInfo = getCookie('user');
//     if (userInfo) {
//       const decodedUserInfo = JSON.parse(decodeURIComponent(userInfo));
//       // setValue('email', decodedUserInfo.email);
//       // setValue('username', decodedUserInfo.username);
//     } else {
//       console.log('사용자 정보가 없습니다.');
//     }
//   }, [setValue]);

//   const inputField = [
//     {
//       label: '이메일 주소',
//       id: 'email',
//       type: 'email',
//       name: 'email',
//       // disabled: true,
//     },
//     {
//       label: '이름',
//       id: 'username',
//       type: 'text',
//       name: 'username',
//     },
//     {
//       label: '휴대폰번호',
//       id: 'phone_number',
//       type: 'number',
//       name: 'phone_number',
//     },
//   ];

//   // 최종 회원가입
//   const onSubmit = async (data: SignupFormData): Promise<void> => {
//     console.log(data);
//     console.log(1);
//     // try {
//     //   const response = await fetch(`${BASE_URL}/api/users/signup`, {
//     //     method: 'POST',
//     //     headers: { 'Content-Type': 'application/json' },
//     //     body: JSON.stringify(data),
//     //   });

//     //   if (response.status !== 200) return;

//     //   if (response.status === 200) {
//     //     const data = await response.json();
//     //     console.log(data);
//     //     alert('회원가입 성공! 로그인 페이지로 이동합니다.');
//     //     router.push(`${DEV_API_URL}/auth/signIn`);
//     //   }
//     // } catch (error) {
//     //   alert(`회원가입 실패: ${error}`);
//     // }
//   };

//   return (
//     <div className="pt-9 pb-9 w-full h-full flex justify-center items-center">
//       <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-[80%] sm:w-1/3 space-y-5">
//         {inputField.map(item => (
//           <FormInput
//             key={item.id}
//             name={item.name as keyof SignupFormData}
//             label={item.label}
//             id={item.id}
//             type={item.type}
//             register={register}
//             errorMessage={errors[item.name as keyof SignupFormData]?.message}
//             // disabled={item.disabled}
//           />
//         ))}
//         <FormButton>회원가입</FormButton>
//       </form>
//     </div>
//   );
// };

// export default SocialSignUpPage;

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignupFormData, FormSchema } from '@/app/auth/schemas/FormSchema';
import FormInput from '@/components/form/FormInput';
import FormButton from '@/components/form/FormButton';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const DEV_API_URL = process.env.NEXT_PUBLIC_DEV_API_URL;

const LocalSignUpPage = () => {
  const router = useRouter();
  // 이메일 인증버튼 비활성화
  const [emailVerificationSent, setEmailVerificationSent] = useState(false);
  // 인증코드 검증버튼 비활성화
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  // 이메일 인증 버튼 클릭 후 문구
  const [verificationEmailMessage, setVerificationEmailMessage] = useState('');
  // 인증버튼 확인 클릭 후 문구
  const [verificationCodeMessage, setVerificationCodeMessage] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(FormSchema),
    mode: 'onBlur',
  });

  const inputField = [
    // {
    //   label: '이름',
    //   id: 'username',
    //   type: 'text',
    //   name: 'username',
    //   placeholder: '이름을 입력하세요',
    // },
    {
      label: '비밀번호',
      id: 'password',
      type: 'password',
      name: 'password',
      placeholder: '비밀번호를 입력하세요',
    },
    {
      label: '비밀번호 확인',
      id: 'password_confirm',
      type: 'password',
      name: 'password_confirm',
      placeholder: '비밀번호를 한번 더 입력하세요',
    },
    {
      label: '휴대폰번호',
      id: 'phone_number',
      type: 'number',
      name: 'phone_number',
      placeholder: '휴대폰번호를 입력하세요',
    },
  ];

  // 최종 회원가입
  const onSubmit = async (data: SignupFormData): Promise<void> => {
    console.log(data);
    // if (!isEmailVerified) {
    //   alert('이메일 인증을 완료해주세요.');
    //   return;
    // }

    // try {
    //   const response = await fetch(`${BASE_URL}/api/users/signup`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data),
    //   });

    //   if (response.status !== 200) return;

    //   if (response.status === 200) {
    //     alert('회원가입 성공! 로그인 페이지로 이동합니다.');
    //     router.push(`${DEV_API_URL}/auth/signIn`);
    //   }
    // } catch (error) {
    //   alert(`회원가입 실패: ${error}`);
    // }
  };

  return (
    <div className="pt-9 pb-9 w-full h-full flex justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-[80%] sm:w-1/3 space-y-5">
        
        {/* 이메일, 인증번호 제외 인풋들 */}
        {inputField.map(item => (
          <FormInput
            key={item.id}
            name={item.name as keyof SignupFormData}
            label={item.label}
            id={item.id}
            type={item.type}
            register={register}
            errorMessage={errors[item.name as keyof SignupFormData]?.message}
            placeholder={item.placeholder}
          />
        ))}

        <FormButton>회원가입</FormButton>
      </form>
    </div>
  );
};

export default LocalSignUpPage;
