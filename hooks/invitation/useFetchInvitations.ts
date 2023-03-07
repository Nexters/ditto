import { createInvitation, getInvitationsByUserId } from '@/lib/supabase/apis/invitation';
import { INVITATION_KEY } from '@/utils/const';
import { useQuery } from '@tanstack/react-query';

/**
 * 내가 생성한 초대 정보 중 유효한 것 하나를 가져온다.
 */
export const useFetchInvitations = (user_id?: number, group_id?: number | null) => {
  return useQuery(
    INVITATION_KEY.list([user_id, group_id]),
    async () => {
      if (!user_id || !group_id) throw 'invalid params';
      const invitations = await getInvitationsByUserId(user_id, group_id);
      if (invitations.length === 0) {
        const invitation = await createInvitation(user_id, group_id);
        invitations.push(invitation);
      }
      return invitations;
    },
    {
      enabled: !!user_id && !!group_id,
    }
  );
};
