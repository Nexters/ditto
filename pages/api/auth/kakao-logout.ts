import { EdgeFunction } from '@/lib/edge/types';
import { HOSTING_URL } from '@/utils/const';
import { NextResponse } from 'next/server';

export const config = {
  runtime: 'edge',
};

const edgeFunction: EdgeFunction = () => {
  // @todo: 리다이렉트 경로를 환경변수로 설정
  const res = NextResponse.redirect(HOSTING_URL, 307);

  res.cookies.set('refresh_token', '', { path: '/', expires: new Date(1), httpOnly: true, secure: true });
  res.cookies.set('access_token', '', { path: '/', expires: new Date(1), httpOnly: true, secure: true });

  return res;
};

export default edgeFunction;
