import { getInvitationInfo } from '@/lib/supabase/apis/invitation';
import { useQuery } from '@tanstack/react-query';

export const useFetchInvitationInfo = (code?: string | null) => {
  return useQuery(
    ['code', code],
    async () => {
      if (!code) throw 'code is null';
      return await getInvitationInfo(code);
    },
    { enabled: !!code }
  );
};
