import { supabase } from '../client';

export const saveToken = async (user_id: number, token: string) => {
  const { error } = await supabase.from('fcm_tokens').upsert({ user_id, token }, { ignoreDuplicates: false });
  if (error) throw error;
};
