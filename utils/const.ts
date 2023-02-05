export const HOSTING_URL = process.env.NEXT_PUBLIC_HOSTING_URL || 'http://localhost:3000';

export const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY as string;
export const KAKAO_CLIENT_SECRET = process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET as string;
export const KAKAO_LOGIN_REDIRECT_URL =
  process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT_URL || 'http://localhost:3000/api/auth/kakao-login';
export const KAKAO_LOGOUT_REDIRECT_URL =
  process.env.NEXT_PUBLIC_KAKAO_LOGOUT_REDIRECT_URL || 'http://localhost:3000/api/auth/kakao-logout';

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
export const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY as string;

export const COOKIE_KAKAO_ACCESS_TOKEN_NAME = 'access_token';
export const COOKIE_KAKAO_REFRESH_TOKEN_NAME = 'refresh_token';

export const API_PRIVATE_KEY = process.env.NEXT_PUBLIC_API_PRIVATE_KEY as string;
