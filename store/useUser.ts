import { getJoinedGroupList } from '@/lib/supabase/apis/group';
import { updateAllowedAlarm } from '@/lib/supabase/apis/user';
import { supabase } from '@/lib/supabase/client';
import { Group, User } from '@/lib/supabase/type';
import { createCredentials } from '@/utils/auth';
import { LOCAL_STORAGE__GROUP_ID } from '@/utils/const';
import { create } from 'zustand';

type UserState = {
  user: User | null;
  isLoading: boolean;
  selectedGroupId: number | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  setGroupId: (groupId: number) => void;
  setAllowedAlarm: (allowed: boolean) => Promise<void>;
};

export const useUser = create<UserState>((set, get) => ({
  user: null,
  isLoading: true,
  selectedGroupId: null,
  login: async () => {
    // @note: 세션에 담긴 쿠키를 통해 자신의 유저 정보를 가져옵니다.
    try {
      const res = await fetch('/api/auth/me');
      const user: User | null = (await res.json())?.data?.user;
      if (!user) throw 'empty user info';
      // @note: authorized 유저만 supabase를 직접 호출할 때 원하는 데이터를 얻을 수 있음.
      const { error } = await supabase.auth.signInWithPassword(createCredentials(user.id, user.oauth_id));
      if (error) throw error;

      // @note: 속한 그룹 중 하나를 선택한다. 최근에 방문한 그룹 정보가 있다면 그걸 선택한다.
      const groupList = await getJoinedGroupList(user.id);
      const latestGroupId = Number(localStorage.getItem(LOCAL_STORAGE__GROUP_ID));
      const selectedGroup: Group | undefined = groupList.find((g) => g.id === latestGroupId) ?? groupList[0];

      set({ user, isLoading: false, selectedGroupId: selectedGroup?.id ?? null });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  logout: async () => {
    // @note: 카카오 로그아웃 url 방문없이, 세션에 담긴 쿠키를 제거합니다.
    await fetch('/api/auth/kakao-logout');
    // @note: supabase에서도 로그아웃 처리합니다.
    await supabase.auth.signOut();

    location.replace('/');
  },
  setGroupId: (groupId: number) => {
    set({ selectedGroupId: groupId });
  },
  setAllowedAlarm: async (allowed: boolean) => {
    const userId = get().user?.id;
    if (!userId) throw 'no user id';

    const user = await updateAllowedAlarm(userId, allowed);
    set({ user });
  },
}));

// @note: 선택한 그룹 id를 localStorage에 저장
useUser.subscribe(({ selectedGroupId }) => {
  if (selectedGroupId) localStorage.setItem(LOCAL_STORAGE__GROUP_ID, String(selectedGroupId));
  else localStorage.removeItem(LOCAL_STORAGE__GROUP_ID);
});
