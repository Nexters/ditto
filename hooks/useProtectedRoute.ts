import { useUser } from '@/store/useUser';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useProtectedRoute = (isProtectedPage = false, redirectUrl = '/') => {
  const router = useRouter();
  const { user, isLoading, login } = useUser();

  // @note:
  // 1. 로그인 전에 로딩 페이지를 보여주는 이유는
  //    로그인 되기 전에 supabase를 통해 api 호출하면 signIn이 되어있지 않아 아무값을 못 얻게되기 때문이다.
  // 2. protected 페이지는 유저 정보가 없을떄 지속적으로 로딩 페이지를 노출하는 이유는
  //   redirectUrl로 이동하기 때문이다.
  const showLoadingPage = isProtectedPage ? isLoading || !user : isLoading;

  useEffect(() => {
    // @note:
    // getServerSideProps에서 edge function을 호출해도 그 응답에 접근할 수 없기에
    // 로그인 여부를 client side에서 최초 mount된 시점에 체크합니다.
    // https://nextjs.org/docs/api-routes/edge-api-routes#differences-between-api-routes
    login().catch(() => null);
  }, [login]);

  useEffect(() => {
    if (isProtectedPage && !isLoading && !user) {
      router.replace(redirectUrl);
    }
  }, [isLoading, isProtectedPage, redirectUrl, router, user]);

  return { showLoadingPage };
};
