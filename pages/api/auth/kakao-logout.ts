import { createHandler } from '@/lib/api-helpers/createHandler';
import { setCookie } from '@/lib/api-helpers/setCookie';

export default createHandler({
  GET: async (req, res) => {
    // clear cookie
    setCookie(res, [
      { name: 'access_token', value: '', options: { path: '/', expires: new Date(1) } },
      { name: 'refresh_token', value: '', options: { path: '/', expires: new Date(1) } },
    ]);
    res.status(307).redirect('/');
  },
});
