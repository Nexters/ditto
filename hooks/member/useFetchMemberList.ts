import { getMemberListByGroupId } from '@/lib/supabase/apis/member';
import { User } from '@/lib/supabase/type';
import { useQuery } from '@tanstack/react-query';

export const useFetchMemberList = (user?: User | null, group_id?: number | null) => {
  return useQuery(
    ['member_list', user, group_id],
    async () => {
      if (!user) throw 'need to login';
      if (!group_id) throw 'need to select group';
      return await getMemberListByGroupId(user.id, group_id);
    },
    { enabled: !!user && !!group_id }
  );
};
