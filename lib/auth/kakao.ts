import { KAKAO_CLIENT_ID, KAKAO_CLIENT_SECRET, KAKAO_LOGIN_REDIRECT_URL } from '@/utils/const';

export type ResponseByCode = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
};
export type ResponseByRefreshToken = Pick<ResponseByCode, 'access_token' | 'expires_in'>;

export type KakaoUserInfo = {
  id: number;
  properties: {
    nickname: string;
    profile_image: string;
  };
};

export const issueAccessToken = async (code: string) => {
  const requestData = {
    grant_type: 'authorization_code',
    code,
    redirect_uri: KAKAO_LOGIN_REDIRECT_URL,
    client_id: KAKAO_CLIENT_ID,
    client_secret: KAKAO_CLIENT_SECRET,
  };
  const urlencoded = new URLSearchParams(requestData);
  const responseByCode: ResponseByCode = await fetch('https://kauth.kakao.com/oauth/token', {
    method: 'post',
    body: urlencoded.toString(),
    headers: {
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  }).then((res) => res.json());

  if (responseByCode.access_token == null) throw 'empty access token';
  return responseByCode;
};

export const reissueAccessToken = async (refresh_token: string) => {
  // 엑세스 토큰 재발급
  const requestData = {
    grant_type: 'refresh_token',
    refresh_token,
    client_id: KAKAO_CLIENT_ID,
    client_secret: KAKAO_CLIENT_SECRET,
  };
  const urlencoded = new URLSearchParams(requestData);
  const responseByRefreshToken: ResponseByRefreshToken = await fetch('https://kauth.kakao.com/oauth/token', {
    method: 'post',
    body: urlencoded.toString(),
    headers: {
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  }).then((res) => res.json());

  if (responseByRefreshToken.access_token == null) throw 'empty access token';
  return responseByRefreshToken;
};

export const fetchUserInfo = async (access_token: string) => {
  const responseByToken: KakaoUserInfo = await fetch('https://kapi.kakao.com/v2/user/me', {
    headers: { Authorization: `Bearer ${access_token}` },
  }).then((res) => res.json());

  return responseByToken;
};
