import { getGroup } from '@/lib/supabase/apis/group';
import { useQuery } from '@tanstack/react-query';
import { GROUP_KEY } from '../queries/keys';

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
