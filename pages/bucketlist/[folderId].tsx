import React from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import PageHeader from '@/components/layouts/Header';
import MainLayout from '@/components/layouts/MainLayout';
import BucketItemList from '@/components/bucketItem/BucketItemList';
import { Text } from '@chakra-ui/react';
import { RabbitWithCarIcon } from '@/components/icons';

const BucketListItem: NextPageWithLayout = () => {
  return (
    <>
      <Text textStyle={'h1'} marginBottom={'12px'}>
        Bucket Item
      </Text>
      <section>
        <RabbitWithCarIcon />
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
BucketListItem.isProtectedPage = true;

export default BucketListItem;
