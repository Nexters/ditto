import { getJoinedGroupList } from '@/lib/supabase/apis/group';
import { User } from '@/lib/supabase/type';
import { useQuery } from '@tanstack/react-query';
import { GROUP_KEY } from '../queries/keys';

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
