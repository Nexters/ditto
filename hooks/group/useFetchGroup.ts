import { getGroup } from '@/lib/supabase/apis/group';
import { GROUP_KEY } from '@/utils/const';
import { useQuery } from '@tanstack/react-query';

export const useFetchGroup = (group_id?: number | null) => {
  return useQuery(
    GROUP_KEY.detail([group_id]),
    async () => {
      if (!group_id) throw 'need to select group';
      return await getGroup(group_id);
    },
    { enabled: !!group_id }
  );
};
