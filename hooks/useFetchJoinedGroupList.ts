import { getJoinedGroupList } from '@/lib/supabase/apis/group';
import { User } from '@/lib/supabase/type';
import { useQuery } from '@tanstack/react-query';

export const useFetchJoinedGroupList = (user?: User | null) => {
  return useQuery(
    ['groups', user],
    async () => {
      if (!user) throw 'need to login';
      return await getJoinedGroupList(user.id);
    },
    { enabled: !!user }
  );
};
