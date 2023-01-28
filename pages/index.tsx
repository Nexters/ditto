import queryString from 'query-string';
import { useEffect } from 'react';

export default function Home() {
  const href = queryString.stringifyUrl({
    url: 'https://kauth.kakao.com/oauth/authorize',
    query: {
      client_id: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY,
      redirect_uri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL,
      response_type: 'code',
    },
  });

  useEffect(() => {
    // get user info by kakao access token
    fetch('/api/auth/user')
      .then((res) => res.json())
      .then(console.log);
  }, []);

  return (
    <div>
      <h1>root page</h1>
      <a href={href}>kakao login</a>
    </div>
  );
}
