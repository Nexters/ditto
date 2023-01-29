import PageHeader from '@/components/layouts/Header';
import MainLayout from '@/components/layouts/MainLayout';
import React from 'react';
import { NextPageWithLayout } from '@/pages/_app';

const Event: NextPageWithLayout = () => {
  return (
    <>
      <h1>일정</h1>
      <section>
        <h2>일정</h2>
      </section>
    </>
  );
};

Event.getLayout = (page) => (
  <MainLayout>
    <PageHeader />
    {page}
  </MainLayout>
);

export default Event;
