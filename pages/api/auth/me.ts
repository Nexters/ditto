import { fetchUserInfo, reissueAccessToken } from '@/lib/auth/kakao';
import { EdgeFunction } from '@/lib/edge/types';
import { NextResponse } from 'next/server';
import { COOKIE_KAKAO_REFRESH_TOKEN_NAME, COOKIE_KAKAO_ACCESS_TOKEN_NAME } from '@/utils/const';
import { createOauthId } from '@/utils/auth';
import { adminApi } from '@/lib/supabase/admin';

export const config = {
  runtime: 'edge',
};

const edgeFunction: EdgeFunction = async (req) => {
  try {
    const refreshToken = req.cookies.get(COOKIE_KAKAO_REFRESH_TOKEN_NAME)?.value;
    let accessToken = req.cookies.get(COOKIE_KAKAO_ACCESS_TOKEN_NAME)?.value;
    let expiresIn = 0;

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

    const oauth_id = createOauthId('kakao', id);

    let found = await adminApi.findUserByOauthId(oauth_id);

    if (!found) {
      // 없으면 회원가입
      found = await adminApi.signUpUser(oauth_id, nickname, profile_image);
    } else if (found.nickname !== nickname || found.profile_image !== profile_image) {
      // 있는데 프로필 정보가 변경되면 업데이트
      found = await adminApi.updateUserInfo(found.id, nickname, profile_image);
    }

    // 로그인 시간 업데이트
    await adminApi.updateUserLoginTime(found.id);

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
      res.cookies.set(COOKIE_KAKAO_ACCESS_TOKEN_NAME, accessToken, {
        path: '/',
        maxAge: expiresIn,
        httpOnly: true,
        sameSite: 'strict',
      });
    }
    return res;
  } catch (error) {
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
    return res;
  }
};

export default edgeFunction;
