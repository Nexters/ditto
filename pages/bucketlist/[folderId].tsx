import PageHeader from '@/components/layouts/Header';
import MainLayout from '@/components/layouts/MainLayout';
import React from 'react';
import { NextPageWithLayout } from '@/pages/_app';

const BucketListItem: NextPageWithLayout = () => {
  return (
    <>
      <h1>Bucket Item</h1>
      <section>
        <h2>버킷리스트</h2>
        <ul>
          <li>버킷리스트 아이템 1</li>
          <li>버킷리스트 아이템 2</li>
        </ul>
      </section>
    </>
  );
};

BucketListItem.getLayout = (page) => (
  <MainLayout>
    <PageHeader useBackButton />
    {page}
  </MainLayout>
);

export default BucketListItem;
