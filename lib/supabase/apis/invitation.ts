import { nanoid } from 'nanoid';
import { supabase } from '../client';

export const createInvitation = async (creator_id: number, group_id: number) => {
  const code = nanoid(10);
  const { data, error } = await supabase.from('invitations').insert({ code, creator_id, group_id }).select();
  const invitation = data?.[0];

  if (!invitation || error) throw error;
  return invitation;
};

export const getInvitationInfo = async (code: string) => {
  const { data, error } = await supabase
    .from('invitations')
    .select(`*, groups ( name ), users ( nickname )`)
    .eq('code', code);
  const invitationInfo = data?.[0];

  if (!invitationInfo || error) throw error;
  return invitationInfo;
};
