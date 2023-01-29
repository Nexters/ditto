import PageHeader from '@/components/layouts/Header';
import MainLayout from '@/components/layouts/MainLayout';
import React from 'react';
import { NextPageWithLayout } from '@/pages/_app';

const MyPage: NextPageWithLayout = () => {
  return (
    <>
      <h1>My Page</h1>
      <section>
        <h2>마이페이지</h2>
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
