import { sendMessage } from '@/lib/api-helpers/sendMessage';
import { setCookie } from '@/lib/api-helpers/setCookie';
import { createHandler } from '@/lib/api-helpers/_handler';
import { fetchUserInfo, reissueAccessToken } from '@/lib/auth/kakao';
import { supabase } from '@/lib/supabase/client';

export default createHandler({
  GET: async (req, res) => {
    try {
      const refreshToken = req.cookies.refresh_token;
      let accessToken = req.cookies.access_token;

      if (!refreshToken) throw 'empty refresh token';
      if (!accessToken) {
        const { access_token, expires_in } = await reissueAccessToken(refreshToken);
        setCookie(res, [{ name: 'access_token', value: access_token, options: { maxAge: expires_in } }]);
        accessToken = access_token;
      }

      const {
        id,
        properties: { nickname, profile_image },
      } = await fetchUserInfo(accessToken);

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

      sendMessage(res, 200, 'ok', { user: found });
    } catch (error) {
      // clear cookie
      setCookie(res, [
        { name: 'access_token', value: '', options: { maxAge: 0 } },
        { name: 'refresh_token', value: '', options: { maxAge: 0 } },
      ]);
      sendMessage(res, 400, 'bad request', { error });
    }
  },
});
