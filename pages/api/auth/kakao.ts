import { setCookie } from '@/lib/api-helpers/setCookie';
import { createHandler } from '@/lib/api-helpers/_handler';
import { issueAccessToken, reissueAccessToken } from '@/lib/auth/kakao';

// export const config = {
//   runtime: 'edge',
// };

export default createHandler({
  GET: async (req, res) => {
    try {
      // 엑세스 토큰 있다면 -> id 조회
      // 없지만 리프레시 토큰 있다면 -> 엑세스 토큰 재발행 -> id 조회
      // 둘 다 없다면, 둘 다 (재)발급 후 id 조회
      // id 조회는 없으면 회원가입, 있으면 정보를 우리 토큰으로 담아서 제공

      const prev_access_token = req.cookies.access_token;
      const prev_refresh_token = req.cookies.refresh_token;
      let user_access_token = prev_access_token;

      if (!user_access_token) {
        if (!prev_refresh_token) {
          // 두 토큰 모두 (재)발급
          const code = req.query.code as string | undefined;
          if (code === undefined) throw 'empty code';

          const responseByCode = await issueAccessToken(code);
          const { access_token, expires_in, refresh_token, refresh_token_expires_in } = responseByCode;

          setCookie(res, [
            { name: 'access_token', value: access_token, options: { maxAge: expires_in } },
            { name: 'refresh_token', value: refresh_token, options: { maxAge: refresh_token_expires_in } },
          ]);

          user_access_token = access_token;
        } else {
          // 엑세스 토큰만 재발급
          const { access_token, expires_in } = await reissueAccessToken(prev_refresh_token);

          setCookie(res, [{ name: 'access_token', value: access_token, options: { maxAge: expires_in } }]);

          user_access_token = access_token;
        }
      }
    } catch (error) {
      // clear cookie
      setCookie(res, [
        { name: 'access_token', value: '', options: { maxAge: 0 } },
        { name: 'refresh_token', value: '', options: { maxAge: 0 } },
      ]);
    } finally {
      res.status(307).redirect('/');
    }
  },
});
