import React from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import PageHeader from '@/components/layouts/Header';
import MainLayout from '@/components/layouts/MainLayout';
import BucketItemList from '@/components/bucketItem/BucketItemList';

const BucketListItem: NextPageWithLayout = () => {
  return (
    <>
      <h1>Bucket Item</h1>
      <section>
        <BucketItemList />
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

export const getStaticProps = () => {
  return {
    props: {
      protected: true,
    },
  };
};
