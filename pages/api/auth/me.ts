import { fetchUserInfo, reissueAccessToken } from '@/lib/auth/kakao';
import { supabase } from '@/lib/supabase/client';
import { EdgeFunction } from '@/lib/edge/types';
import { NextResponse } from 'next/server';

export const config = {
  runtime: 'edge',
};

const edgeFunction: EdgeFunction = async (req) => {
  try {
    const refreshToken = req.cookies.get('refresh_token')?.value;
    let accessToken = req.cookies.get('access_token')?.value;
    let expiresIn: number = 0;

    if (!refreshToken) throw 'empty refresh token';
    if (!accessToken) {
      const { access_token, expires_in } = await reissueAccessToken(refreshToken);
      accessToken = access_token;
      expiresIn = expires_in;
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

    const res = new NextResponse(
      JSON.stringify({
        message: 'ok',
        data: { user: found },
      }),
      {
        status: 200,
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
      }
    );
    if (expiresIn > 0) {
      res.cookies.set('access_token', accessToken, { path: '/', maxAge: expiresIn });
    }
    return res;
  } catch (error) {
    console.log(error);
    const res = new NextResponse(
      JSON.stringify({
        message: 'bad request',
        error,
      }),
      {
        status: 400,
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
      }
    );
    // clear cookie
    // res.cookies.delete('refresh_token');
    // res.cookies.delete('access_token');
    return res;
  }
};

export default edgeFunction;
