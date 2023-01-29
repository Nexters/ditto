import { setCookie } from '@/lib/api-helpers/setCookie';
import { createHandler } from '@/lib/api-helpers/createHandler';
import { issueAccessToken } from '@/lib/auth/kakao';

// export const config = {
//   runtime: 'edge',
// };

export default createHandler({
  GET: async (req, res) => {
    try {
      // 두 토큰 모두 (재)발급
      const code = req.query.code as string | undefined;
      if (code === undefined) throw 'empty code';

      const responseByCode = await issueAccessToken(code);
      const { access_token, expires_in, refresh_token, refresh_token_expires_in } = responseByCode;

      setCookie(res, [
        { name: 'access_token', value: access_token, options: { path: '/', maxAge: expires_in } },
        { name: 'refresh_token', value: refresh_token, options: { path: '/', maxAge: refresh_token_expires_in } },
      ]);
    } catch (error) {
      // no action
    } finally {
      res.status(307).redirect('/');
    }
  },
});
