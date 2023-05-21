import { supabase } from '../client';

export const saveToken = async (user_id: number, token: string) => {
  // @note: upsert는 존재하지 않으면 추가하고, 존재하면 업데이트를 한다.
  // link: https://supabase.com/docs/reference/javascript/upsert
  const { error } = await supabase
    .from('fcm_tokens')
    .upsert({ user_id, token, last_used_time: new Date().toISOString() });

  if (error) throw error;
};
