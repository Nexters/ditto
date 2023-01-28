import PageHeader from '@/components/layouts/Header';
import MainLayout from '@/components/layouts/MainLayout';
import React from 'react';

const MyPage = () => {
  return (
    <MainLayout>
      <PageHeader />
      <h1>My Page</h1>
      <section>
        <h2>마이페이지</h2>
      </section>
    </MainLayout>
  );
};

export default MyPage;
