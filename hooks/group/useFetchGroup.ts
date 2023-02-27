import { getGroup } from '@/lib/supabase/apis/group';
import { useQuery } from '@tanstack/react-query';

export const useFetchGroup = (group_id?: number | null) => {
  return useQuery(
    ['useFetchGroup', group_id],
    async () => {
      if (!group_id) throw 'need to select group';
      return await getGroup(group_id);
    },
    { enabled: !!group_id }
  );
};
