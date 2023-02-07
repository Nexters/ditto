import PageHeader from '@/components/layouts/Header';
import MainLayout from '@/components/layouts/MainLayout';
import React from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import { useUser } from '@/store/useUser';
import { useRouter } from 'next/router';

const MyPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { logout } = useUser();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <>
      <h1>My Page</h1>
      <section>
        <h2>마이페이지</h2>
        <button onClick={handleLogout}>로그아웃</button>
      </section>
    </>
  );
};

MyPage.getLayout = (page) => (
  <MainLayout>
    <PageHeader />
    {page}
  </MainLayout>
);

export default MyPage;
