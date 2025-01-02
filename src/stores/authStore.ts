import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Tokens, User } from '@/types/types';

type AuthState = {
  user: User | null; // 일반 로그인 상태
  socialUser: User | null; // 소셜 로그인 후 일회성 저장
  isAuthenticated: boolean;
  token: Tokens | null;
  login: (userData: User, token: Tokens) => void;
  logout: () => void;
  setSocialUser: (userData: User) => void; // 소셜 로그인용 set 함수
};

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      socialUser: null, // 초기값은 null
      isAuthenticated: false,
      token: null,
      login: (userData, token) =>
        set({
          user: userData,
          isAuthenticated: true,
          token,
        }),
      logout: () =>
        set({
          user: null,
          socialUser: null, // 로그아웃 시 소셜 유저 정보도 초기화
          isAuthenticated: false,
          token: null,
        }),
      setSocialUser: (userData: User) => set({ socialUser: userData }), // 소셜 유저 정보만 설정
    }),
    {
      name: 'auth-storage',
    }
  )
);


export default useAuthStore;
