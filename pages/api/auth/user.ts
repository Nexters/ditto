import { sendMessage } from '@/lib/api-helpers/sendMessage';
import { createHandler } from '@/lib/api-helpers/_handler';
import { fetchUserInfo } from '@/lib/auth/kakao';
import { supabase } from '@/lib/supabase/client';

export default createHandler({
  GET: async (req, res) => {
    const access_token = req.cookies.access_token;

    if (!access_token) return sendMessage(res, 401, 'no authorized');

    const {
      id,
      properties: { nickname, profile_image },
    } = await fetchUserInfo(access_token);

    const oauth_id = `kakao:${id}`;

    let found = (await supabase.from('users').select().eq('oauth_id', oauth_id)).data?.[0];

    if (!found) {
      // 없으면 회원가입
      const { data, error } = await supabase.from('users').insert({ oauth_id, nickname, profile_image }).select();
      found = data?.[0];
      if (error || !found) throw error;
    } else if (found.nickname !== nickname || found.profile_image !== profile_image) {
      // 있는데 프로필 정보가 변경되면 업데이트
      const { data, error } = await supabase
        .from('users')
        .update({ nickname, profile_image })
        .eq('id', found.id)
        .select();
      found = data?.[0];
      if (error || !found) throw error;
    }

    sendMessage(res, 200, 'ok', found);
  },
});
