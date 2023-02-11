import { INVITATION_CODE_LENGTH } from '@/utils/const';
import { addDays } from '@/utils/date';
import { nanoid } from 'nanoid';
import { supabase } from '../client';
import { InvitationInfo } from '../type';

export const createInvitation = async (creator_id: number, group_id: number) => {
  const code = nanoid(INVITATION_CODE_LENGTH);
  const { data, error } = await supabase.from('invitations').insert({ code, creator_id, group_id }).select();
  const invitation = data?.[0];

  if (!invitation || error) throw error;
  return invitation;
};

export const getInvitationInfo = async (code: string) => {
  if (code.length !== INVITATION_CODE_LENGTH) throw 'invalid code';

  const minCreatedTime = addDays(new Date(), -1);
  const { data, error } = await supabase
    .from('invitations')
    .select(`*, groups ( name ), users ( nickname )`)
    .eq('code', code)
    // @note: 생성시점이 min(= 현재 - 24시간) 보다 커야 유효한 시점
    .gt('created_time', minCreatedTime.toISOString());
  const invitationInfo = data?.[0];

  if (!invitationInfo || error) throw error;
  return invitationInfo as InvitationInfo;
};
