import { issueAccessToken } from '@/lib/auth/kakao';
import { EdgeFunction } from '@/lib/edge/types';
import { HOSTING_URL } from '@/utils/const';
import { NextResponse } from 'next/server';

export const config = {
  runtime: 'edge',
};

const edgeFunction: EdgeFunction = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');
    if (!code) throw 'empty code';

    const responseByCode = await issueAccessToken(code);
    const { access_token, expires_in, refresh_token, refresh_token_expires_in } = responseByCode;

    // @todo: 리다이렉트 경로를 환경변수로 설정
    const res = NextResponse.redirect(HOSTING_URL, 307);

    // @note: edge runtime에선 현재 쿠키가 두개 이상 set하면 첫번째꺼만 반영되는 이슈가 있음
    // 임시로 refresh_token을 먼저 쓰도록 하고, access_token set은 /api/auth/me 에서 진행되도록 한다.
    // https://github.com/vercel/next.js/issues/38302
    res.cookies.set('refresh_token', refresh_token, {
      path: '/',
      maxAge: refresh_token_expires_in,
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    res.cookies.set('access_token', access_token, {
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
