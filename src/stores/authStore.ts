import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, socialUser } from '@/types/types';

type AuthState = {
  user: User | null; // 일반 로그인 상태
  socialUser: socialUser | null; // 소셜 로그인 후 일회성 저장
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
  setSocialUser: (userData: socialUser) => void; // 소셜 로그인용 set 함수
};

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      socialUser: null, // 초기값은 null
      isAuthenticated: false,
      login: userData =>
        set({
          user: userData,
          isAuthenticated: true,
        }),
      logout: () =>
        set({
          user: null,
          socialUser: null, // 로그아웃 시 소셜 유저 정보도 초기화
          isAuthenticated: false,
        }),
      setSocialUser: (userData: socialUser) => set({ socialUser: userData }), // 소셜 유저 정보만 설정
    }),
    {
      name: 'auth-storage',
    }
  )
);


export default useAuthStore;
