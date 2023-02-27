import { getJoinedGroupList } from '@/lib/supabase/apis/group';
import { User } from '@/lib/supabase/type';
import { GROUP_KEY } from '@/utils/const';
import { useQuery } from '@tanstack/react-query';

export const useFetchJoinedGroupList = (user?: User | null) => {
  return useQuery(
    GROUP_KEY.list([user]),
    async () => {
      if (!user) throw 'need to login';
      return await getJoinedGroupList(user.id);
    },
    { enabled: !!user }
  );
};
