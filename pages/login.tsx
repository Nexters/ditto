import queryString from 'query-string';

const Login = () => {
  const href = queryString.stringifyUrl({
    url: 'https://kauth.kakao.com/oauth/authorize',
    query: {
      client_id: '36644a440cc5bc71efee969ef7e2e4d8',
      redirect_uri: 'http://localhost:3000/oauth',
      response_type: 'code',
    },
  });
  return (
    <div>
      <h1>login page</h1>
      <a href={href}>kakao login</a>
    </div>
  );
};

export default Login;
