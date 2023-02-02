import { KAKAO_CLIENT_ID, KAKAO_LOGIN_REDIRECT_URL, KAKAO_LOGOUT_REDIRECT_URL } from '@/utils/const';
import queryString from 'query-string';
import { useEffect } from 'react';

export default function Home() {
  const loginHref = queryString.stringifyUrl({
    url: 'https://kauth.kakao.com/oauth/authorize',
    query: {
      client_id: KAKAO_CLIENT_ID,
      redirect_uri: KAKAO_LOGIN_REDIRECT_URL,
      response_type: 'code',
    },
  });
  const logoutHref = queryString.stringifyUrl({
    url: 'https://kauth.kakao.com/oauth/logout',
    query: {
      client_id: KAKAO_CLIENT_ID,
      logout_redirect_uri: KAKAO_LOGOUT_REDIRECT_URL,
      response_type: 'code',
    },
  });

  useEffect(() => {
    // get user info by kakao access token
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then(console.log);
  }, []);

  return (
    <div>
      <h1>root page</h1>
      <a href={loginHref}>kakao login</a>
      <a href={logoutHref}>kakao logout</a>
    </div>
  );
}
