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
  return invitation as InvitationInfo;
};

export const getInvitationsByUserId = async (creator_id: number, group_id: number) => {
  const minCreatedTime = addDays(new Date(), -1);
  const { data, error } = await supabase
    .from('invitations')
    .select(`*`)
    .eq('creator_id', creator_id)
    .eq('group_id', group_id)
    // @note: 생성시점이 min(= 현재 - 24시간) 보다 커야 유효한 시점
    .gt('created_time', minCreatedTime.toISOString());

  if (error) throw error;
  return data as InvitationInfo[];
};
