import React from 'react';
import PageHeader from '@/components/layouts/Header';
import MainLayout from '@/components/layouts/MainLayout';
import { NextPageWithLayout } from '@/pages/_app';
import BucketFolderList from '@/components/bucketFolder/BucketFolderList';

const BucketList: NextPageWithLayout = () => {
  return (
    <>
      <h1>Bucket List</h1>
      <section>
        <BucketFolderList />
      </section>
    </>
  );
};

BucketList.getLayout = (page) => (
  <MainLayout>
    <PageHeader />
    {page}
  </MainLayout>
);
BucketList.needProtected = true;

export default BucketList;
