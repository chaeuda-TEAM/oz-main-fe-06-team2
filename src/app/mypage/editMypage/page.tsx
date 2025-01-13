// 'use client';

// import useAuthStore from '@/stores/authStore';
// import { useRouter } from 'next/navigation';
// import FormInput from '@/components/form/SocialSignUpFormInput';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { SocialSignupFormData, SocialSignUpSchema } from '@/app/auth/schemas/SocialSignInSchema';
// import { useEffect } from 'react';
// import FormButton from '@/components/form/FormButton';
// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
// const DEV_API_URL = process.env.NEXT_PUBLIC_DEV_API_URL;

// const MyPage = () => {
//   const { user } = useAuthStore();
//   const router = useRouter();

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm<SocialSignupFormData>({
//     resolver: zodResolver(SocialSignUpSchema),
//     mode: 'onBlur',
//     defaultValues: {
//       email: '',
//       username: '',
//     },
//   });

//   const inputField = [
//     {
//       label: '이메일 주소',
//       id: 'email',
//       type: 'email',
//       name: 'email',
//       disabled: true,
//     },
//     {
//       label: '이름',
//       id: 'username',
//       type: 'text',
//       name: 'username',
//       placeholder: '이름을 입력하세요',
//     },
//     {
//       label: '휴대폰번호',
//       id: 'phone_number',
//       type: 'phone',
//       name: 'phone_number',
//       placeholder: '휴대폰번호를 입력하세요',
//     },
//   ];

//   useEffect(() => {
//     setValue('email', user?.email || '');
//     setValue('username', user?.username || '');
//     setValue('phone_number', user?.phone_number || '');
//   }, [user]);

//     // 최종 수정 버튼 클릭
//     const onSubmit = async (data: SocialSignupFormData): Promise<void> => {

//       try {
//         const response = await fetch(`${BASE_URL}/api/users/update-profile`, {
//           method: 'PUT',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(data),
//         });

//         if (response.status !== 200) {
//           return console.log('회원수정 실패');
//         };

//         if (response.status === 200) {
//           alert('회원가입 성공! 로그인 페이지로 이동합니다.');
//           router.push(`${DEV_API_URL}/auth/signIn`);
//         }
//       } catch (error) {
//         alert(`회원가입 실패: ${error}`);
//       }
//     };

//   return (
//     <div className="pt-9 pb-9 w-full h-full flex justify-center items-center">
//       <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-[80%] sm:w-1/3 space-y-5">
//         {inputField.map(item => (
//           <FormInput
//           key={item.id}
//           name={item.name as keyof SocialSignupFormData}
//           label={item.label}
//           id={item.id}
//           type={item.type}
//           register={register}
//           errorMessage={errors[item.name as keyof SocialSignupFormData]?.message}
//           disabled={item.disabled}
//           placeholder={item.placeholder}
//           />
//         ))}
//         <FormButton>정보 수정 완료</FormButton>
//       </form>
//     </div>
//   );
// };

// export default MyPage;

'use client';

import useAuthStore from '@/stores/authStore';
import { useRouter } from 'next/navigation';
import FormInput from '@/components/form/SocialMypageFormInput';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  SocialEditMypageFormData,
  SocialEditMypageSchema,
} from '@/app/auth/schemas/SocialEditMypageSchema';
import { useEffect } from 'react';
import FormButton from '@/components/form/FormButton';
import useUpdateProfile from '@/hooks/useUpdateProfile';
import useFetchProfile from '@/hooks/useFetchProfile';

const MyPage = () => {
  const { login, user } = useAuthStore();
  const router = useRouter();
  const { updateProfile } = useUpdateProfile();
  const { getUpdateProfile } = useFetchProfile();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SocialEditMypageFormData>({
    resolver: zodResolver(SocialEditMypageSchema),
    mode: 'onBlur',
    defaultValues: {
      //   email: '',
      username: '',
      phone_number: '',
    },
  });

  const inputField = [
    {
      label: '이름',
      id: 'username',
      type: 'text',
      name: 'username',
      placeholder: '이름을 입력하세요',
    },
    {
      label: '휴대폰번호',
      id: 'phone_number',
      type: 'phone',
      name: 'phone_number',
      placeholder: '휴대폰번호를 입력하세요',
    },
  ];

  useEffect(() => {
    setValue('username', user?.username || '');
    setValue('phone_number', user?.phone_number || '');
  }, [user]);

  // 최종 수정 버튼 클릭
  const onSubmit = async (data: SocialEditMypageFormData): Promise<void> => {

    try {
      const result = await updateProfile(data);

      if (result.success) {
        const result = await getUpdateProfile();
        console.log(result);
        router.back();
        login(result.user);
      }
    } catch (error) {
      console.error('회원정보 수정 실패:', error);
    }
  };

  return (
    <div className="pt-9 pb-9 w-full h-full flex justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-[80%] sm:w-1/3 space-y-5">
        <div className="flex flex-col space-y-1.5">
          <label htmlFor="email">이메일 주소</label>
          <input
            id="email"
            type="email"
            defaultValue={(user && user.email) || ''}
            className="border border-gray-400 w-full h-9 text-4 p-2"
            disabled={true}
          />
        </div>

        {inputField.map(item => (
          <FormInput
            key={item.id}
            name={item.name as keyof SocialEditMypageFormData}
            label={item.label}
            id={item.id}
            type={item.type}
            register={register}
            errorMessage={errors[item.name as keyof SocialEditMypageFormData]?.message}
            placeholder={item.placeholder}
          />
        ))}
        <FormButton>정보 수정 완료</FormButton>
      </form>
    </div>
  );
};

export default MyPage;
