import { supabase } from '@/lib/supabase';
import { sendMessage, setCookie } from '@/utils/nextjs';
import { NextApiHandler } from 'next';

// export const config = {
//   runtime: 'edge',
// };

type ResponseByCode = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
};
type ResponseByToken = {
  id: number;
  properties: {
    nickname: string;
    profile_image: string;
  };
};

const redirect_uri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL as string;
const client_id = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY as string;
const client_secret = process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET as string;

const handler: NextApiHandler = async (req, res) => {
  console.log(req.method, redirect_uri, client_id, client_secret);
  if (req.method !== 'GET') return res.status(404).send('not found');

  try {
    // 엑세스 토큰 있다면 -> id 조회
    // 없지만 리프레시 토큰 있다면 -> 엑세스 토큰 재발행 -> id 조회
    // 둘 다 없다면, 둘 다 (재)발급 후 id 조회
    // id 조회는 없으면 회원가입, 있으면 정보를 우리 토큰으로 담아서 제공

    const prev_access_token = req.cookies.access_token;
    const prev_refresh_token = req.cookies.refresh_token;
    let user_access_token = prev_access_token;

    console.log('prev', prev_access_token, prev_refresh_token);

    if (!user_access_token) {
      if (prev_refresh_token) {
        // 엑세스 토큰 재발급
        const requestData = {
          grant_type: 'refresh_token',
          refresh_token: prev_refresh_token,
          client_id,
          client_secret,
        };
        const urlencoded = new URLSearchParams(requestData);
        const responseByRefreshToken = await fetch('https://kauth.kakao.com/oauth/token', {
          method: 'post',
          body: urlencoded.toString(),
          headers: {
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        }).then((res) => res.json());
        const { access_token, expires_in } = responseByRefreshToken as ResponseByCode;

        console.log('responseByRefreshToken', responseByRefreshToken);
        if (!access_token) return sendMessage(res, 400, 'wrong token'); // res.status(500).send('wrong token');

        setCookie(res, [{ name: 'access_token', value: access_token, options: { maxAge: expires_in } }]); // 'access_token', access_token, { maxAge: expires_in });
        // setCookie(res, 'refresh_token', refresh_token, { maxAge: refresh_token_expires_in });

        user_access_token = access_token;
      } else {
        // 두 토큰 모두 재발급
        const code = req.query.code as string | undefined;
        if (code === undefined) {
          return sendMessage(res, 400, 'empty code');
        }

        const requestData = {
          grant_type: 'authorization_code',
          code,
          redirect_uri: 'http://localhost:3000/oauth',
          client_id,
          client_secret,
        };
        const urlencoded = new URLSearchParams(requestData);
        const responseByCode: ResponseByCode = await fetch('https://kauth.kakao.com/oauth/token', {
          method: 'post',
          body: urlencoded.toString(),
          headers: {
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        }).then((res) => res.json());
        console.log('responseByCode', responseByCode);

        const { access_token, expires_in, refresh_token, refresh_token_expires_in } = responseByCode;

        if (!access_token || !refresh_token) return sendMessage(res, 400, 'wrong token'); // res.status(500).send('wrong token');

        setCookie(res, [
          { name: 'access_token', value: access_token, options: { maxAge: expires_in } },
          { name: 'refresh_token', value: refresh_token, options: { maxAge: refresh_token_expires_in } },
        ]);
        // setCookie(res, 'access_token', access_token, { maxAge: expires_in });
        // setCookie(res, 'refresh_token', refresh_token, { maxAge: refresh_token_expires_in });

        user_access_token = access_token;
      }
    }
    console.log('user_access_token', user_access_token);

    const config = { headers: { Authorization: `Bearer ${user_access_token}` } };
    const responseByToken = await fetch('https://kapi.kakao.com/v2/user/me', config).then((res) => res.json());
    console.log('responseByToken', responseByToken);
    const {
      id,
      properties: { nickname, profile_image },
    } = responseByToken as ResponseByToken;
    const oauth_id = `kakao:${id}`;

    const found = (await supabase.from('users').select('*').eq('oauth_id', oauth_id)).data?.[0];
    console.log('found', found);
    if (!found) {
      const { data, error } = await supabase.from('users').insert({ oauth_id, nickname, profile_image });
      console.log(data, error);
    } else {
      await supabase.from('users').update({ nickname, profile_image }).eq('id', found.id);
    }
    const found2 = (await supabase.from('users').select('*').eq('oauth_id', oauth_id)).data?.[0];

    return sendMessage(res, 200, 'ok', found2); // res.status(200).send('ok');
  } catch (error) {
    console.log(error);
    return sendMessage(res, 500, 'internal server error'); //res.status(500).send('server error');
  }
};

export default handler;
