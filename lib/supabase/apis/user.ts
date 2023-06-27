import { supabase } from '../client';

export const updateAllowedAlarm = async (user_id: number, allowed: boolean) => {
  const { data, error } = await supabase.from('users').update({ is_allowed_alarm: allowed }).eq('id', user_id).select();
  const user = data?.[0];
  if (!user || error) throw error;
  return user;
};
