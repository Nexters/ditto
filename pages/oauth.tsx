import { useRouter } from 'next/router';
import queryString from 'query-string';
import { useEffect } from 'react';

const OAuth = () => {
  const router = useRouter();
  useEffect(() => {
    const { code } = queryString.parse(location.search);
    fetch(`/api/auth/kakao?code=${code}`)
      .then((res) => {
        if (res.status !== 200) throw 'status not 200';
        return res.json();
      })
      .then((res) => {
        // setUser({ ...user, ...res.data.user });
        // history.push();
        console.log(res);
        router.push('/');
      })
      .catch((err) => {
        console.log(err);
        alert('로그인에 실패했습니다.');
        // history.push('/');
      });
  }, []);
  return 'checking';
};

export default OAuth;
