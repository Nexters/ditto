import { getMemberListByGroupId } from '@/lib/supabase/apis/member';
import { MEMBER_KEY } from '@/utils/const';
import { useQuery } from '@tanstack/react-query';

export const useFetchMemberList = (group_id?: number | null) => {
  return useQuery(
    MEMBER_KEY.list([group_id]),
    async () => {
      if (!group_id) throw 'need to select group';
      return await getMemberListByGroupId(group_id);
    },
    { enabled: !!group_id }
  );
};
