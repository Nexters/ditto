import { EdgeFunction } from '@/lib/edge/types';
import { HOSTING_URL } from '@/utils/const';
import { NextResponse } from 'next/server';

export const config = {
  runtime: 'edge',
};

const edgeFunction: EdgeFunction = () => {
  // @todo: 리다이렉트 경로를 환경변수로 설정
  const res = NextResponse.redirect(HOSTING_URL, 302);

  res.cookies.delete('refresh_token');
  res.cookies.delete('access_token');

  return res;
};

export default edgeFunction;
