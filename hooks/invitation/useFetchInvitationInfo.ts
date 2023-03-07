import { InvitationInfo } from '@/lib/supabase/type';
import { INVITATION_KEY } from '@/utils/const';
import { useQuery } from '@tanstack/react-query';

type InvitationVerifyResult = {
  data?: {
    invitationInfo?: InvitationInfo;
  };
};

export const useFetchInvitationInfo = (code?: string | null) => {
  return useQuery(
    INVITATION_KEY.detail([code]),
    async () => {
      if (!code) throw 'code is null';
      const res = await fetch('/api/invitation/verify', { method: 'post', body: JSON.stringify({ code }) });
      const { data } = (await res.json()) as InvitationVerifyResult;
      return data?.invitationInfo;
    },
    { enabled: !!code }
  );
};
