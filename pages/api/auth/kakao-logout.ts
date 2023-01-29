import { EdgeFunction } from '@/lib/edge/types';
import { NextResponse } from 'next/server';

export const config = {
  runtime: 'edge',
};

const edgeFunction: EdgeFunction = () => {
  // @todo: 리다이렉트 경로를 환경변수로 설정
  const res = NextResponse.redirect('http://localhost:3000/', 307);

  res.cookies.set('refresh_token', '', { maxAge: 0 });
  res.cookies.set('access_token', '', { maxAge: 0 });

  return res;
};

export default edgeFunction;
