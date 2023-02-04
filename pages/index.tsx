import { useUser } from '@/store/useUser';
import { KAKAO_CLIENT_ID, KAKAO_LOGIN_REDIRECT_URL, KAKAO_LOGOUT_REDIRECT_URL } from '@/utils/const';
import queryString from 'query-string';
export default function Home() {
  const { user } = useUser();

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

  return (
    <div>
      <h1>root page {user?.nickname}</h1>
      <a href={loginHref}>kakao login</a>
      <a href={logoutHref}>kakao logout</a>
    </div>
  );
}
