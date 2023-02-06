import { User } from '@/lib/supabase/type';
import { create } from 'zustand';

type UserState = (
  | {
      user: User;
      isLoggedIn: true;
    }
  | {
      user: null;
      isLoggedIn: false;
    }
) & {
  login: () => Promise<void>;
  logout: () => Promise<void>;
};

export const useUser = create<UserState>((set) => ({
  user: null,
  isLoggedIn: false,
  login: async () => {
    // @note: 세션에 담긴 쿠키를 통해 자신의 유저 정보를 가져옵니다.
    const res = await fetch('/api/auth/me');
    const user = (await res.json())?.data?.user;
    if (!user) throw 'empty user info';
    set({ user, isLoggedIn: true });
  },
  logout: async () => {
    // @note: 카카오 로그아웃 url 방문없이, 세션에 담긴 쿠키를 제거합니다.
    await fetch('/api/auth/kakao-logout');
    set({ user: null, isLoggedIn: false });
  },
}));
