"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BASEURL } from '@/constants/apiUrls';
import { FormData } from "@/types/types";

const LocalSignUpPage = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    user_id: "",
    password: "",
    phone_number: "",
    email: "",
  });
  const [email, setEmail] = useState("")
  const [verificationCode, setVerificationCode] = useState<string>("")
  const router = useRouter();

  // 인풋에 값 넣을 때 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // 인증번호 이메일로 전송
  const sendEmailVerificationCode  = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASEURL}/api/users/request-email-verification`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email
        })
      })

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        alert("입력하신 이메일로 인증번호를 보냈습니다.");
      } 
    } catch (error) {
      alert(`인증번호 전송 실패: ${error}`);
    }
  }

  // 인증번호 확인
  const verifyEmailVerificationCode  = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASEURL}/api/users/verify-email`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          {
            email: email,
            code: verificationCode
          }
        )
      })

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        alert("이메일 인증을 완료했습니다.");
      } 
    } catch (error) {
      alert(`이메일 인증에 실패했습니다.: ${error}`);
    }
  }

  // 최종 회원가입
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASEURL}/api/users/signup`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        alert("회원가입 성공! 로그인 페이지로 이동합니다.");
        router.push("/");
      } 
    } catch (error) {
      alert(`회원가입 실패: ${error}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col w-[300px]">
        <label htmlFor="username">이름</label>
        <input
          id="username"
          name='username'
          type="text"
          value={formData.username}
          onChange={handleChange}
          className="border border-black"
        />
        <label htmlFor="user_id">아이디</label>
        <input
          id="user_id"
          name="user_id"
          type="text"
          value={formData.user_id}
          onChange={handleChange}
          className="border border-black"
        />
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          className="border border-black"
        />
        <label htmlFor="password_confirm">비밀번호 확인</label>
        <input
          id="password_confirm"
          name="password_confirm"
          type="password"
          // value={formData.password_confirm}
          onChange={handleChange}
          className="border border-black"
        />
        <label htmlFor="phone_number">휴대폰번호</label>
        <input
          id="phone_number"
          name="phone_number"
          type="number"
          value={formData.phone_number}
          onChange={handleChange}
          className="border border-black"
        />
        <label htmlFor="email">이메일 주소</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="border border-black"
        />
        <button onClick={sendEmailVerificationCode }>이메일 인증</button>
        <label htmlFor="authenticateEmail">이메일 인증번호</label>
        <input
          id="authenticateEmail"
          name="authenticateEmail"
          type="number"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          className="border border-black"
        />
        <button onClick={verifyEmailVerificationCode}>인증번호 확인</button>
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default LocalSignUpPage;
