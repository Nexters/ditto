import { issueAccessToken } from '@/lib/auth/kakao';
import { EdgeFunction } from '@/lib/edge/types';
import { COOKIE_KAKAO_ACCESS_TOKEN_NAME, COOKIE_KAKAO_REFRESH_TOKEN_NAME, HOSTING_URL } from '@/utils/const';
import { NextResponse } from 'next/server';

export const config = {
  runtime: 'edge',
};

const withState = (url: string, state?: string | null) => `${url}/?state=${state}`;

const edgeFunction: EdgeFunction = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (!code) throw 'empty code';

    const responseByCode = await issueAccessToken(code);
    const { access_token, expires_in, refresh_token, refresh_token_expires_in } = responseByCode;

    const res = NextResponse.redirect(withState(HOSTING_URL, state), 302);

    // @note: edge runtime에선 현재 쿠키가 두개 이상 set하면 첫번째꺼만 반영되는 이슈가 있음
    // 임시로 refresh_token을 먼저 쓰도록 하고, access_token set은 /api/auth/me 에서 진행되도록 한다.
    // https://github.com/vercel/next.js/issues/38302
    res.cookies.set(COOKIE_KAKAO_REFRESH_TOKEN_NAME, refresh_token, {
      path: '/',
      maxAge: refresh_token_expires_in,
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    res.cookies.set(COOKIE_KAKAO_ACCESS_TOKEN_NAME, access_token, {
      path: '/',
      maxAge: expires_in,
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    return res;
  } catch (error) {
    return NextResponse.redirect(HOSTING_URL, 307);
  }
};

export default edgeFunction;
