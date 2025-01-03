import { z } from 'zod';

export const SocialSignUpSchema = z
  .object({
    username: z
      .string()
      .min(2, '이름은 최소 2자 이상이어야 합니다.')
      .max(30, '이름은 최대 30자까지만 허용됩니다.'),

    phone_number: z.string().regex(/^\d{10,11}$/, '휴대폰 번호는 10~11자리 숫자로 입력해주세요.'),

    email: z
      .string()
      .email('유효한 이메일 주소를 입력해주세요.')
      .nonempty('이메일을 입력해주세요.'),
  })

export type SocialSignupFormData = z.infer<typeof SocialSignUpSchema>;
