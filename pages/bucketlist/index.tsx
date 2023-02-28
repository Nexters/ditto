import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { NextPageWithLayout } from '@/pages/_app';
import BucketFolderList from '@/components/bucketFolder/BucketFolderList';
import { BucketlistHeader } from '@/components/header/BucketlistHeader';

const BucketList: NextPageWithLayout = () => {
  return (
    <MainLayout header={<BucketlistHeader />}>
      <BucketFolderList />
    </MainLayout>
  );
};

BucketList.isProtectedPage = true;

export default BucketList;
