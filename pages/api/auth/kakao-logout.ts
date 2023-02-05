import { EdgeFunction } from '@/lib/edge/types';
import { COOKIE_KAKAO_ACCESS_TOKEN_NAME, COOKIE_KAKAO_REFRESH_TOKEN_NAME, HOSTING_URL } from '@/utils/const';
import { NextResponse } from 'next/server';

export const config = {
  runtime: 'edge',
};

const edgeFunction: EdgeFunction = () => {
  const res = NextResponse.redirect(HOSTING_URL, 302);

  res.cookies.delete(COOKIE_KAKAO_REFRESH_TOKEN_NAME);
  res.cookies.delete(COOKIE_KAKAO_ACCESS_TOKEN_NAME);

  return res;
};

export default edgeFunction;
