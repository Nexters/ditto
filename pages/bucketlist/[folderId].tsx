import React from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import PageHeader from '@/components/layouts/Header';
import MainLayout from '@/components/layouts/MainLayout';
import BucketItemList from '@/components/bucketItem/BucketItemList';
import { Text } from '@chakra-ui/react';
import { RabbitWithCarIcon } from '@/components/icons';
import { useRouter } from 'next/router';
import { useFetchBucketFolderById } from '@/hooks/bucketlist/useFetchBucketFolderById';

const BucketListItem: NextPageWithLayout = () => {
  const router = useRouter();
  const { folderId } = router.query;

  const { data } = useFetchBucketFolderById(Number(folderId));

  return (
    <>
      <Text textStyle={'h1'} marginBottom={'12px'} minHeight={'105px'}>
        {data?.title}
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
