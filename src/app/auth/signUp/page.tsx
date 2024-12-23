"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

interface FormData {
  username: string;
  user_id: string;
  password: string;
  password_confirm: string;
  phone_number: string;
  email: string;
}

const LocalSignUpPage = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    user_id: "",
    password: "",
    password_confirm: "",
    phone_number: "",
    email: "",
  });
  const [authenticateEmail, setAuthenticateEmail] = useState<string>("")
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData,
      [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/users/signup', {
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
          value={formData.password_confirm}
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
        <label htmlFor="authenticateEmail">이메일 인증번호</label>
        <input
          id="authenticateEmail"
          name="authenticateEmail"
          type="number"
          value={authenticateEmail}
          onChange={(e) => setAuthenticateEmail(e.target.value)}
          className="border border-black"
        />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default LocalSignUpPage;
