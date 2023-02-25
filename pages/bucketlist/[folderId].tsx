import React from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import PageHeader from '@/components/layouts/Header';
import MainLayout from '@/components/layouts/MainLayout';
import BucketItemList from '@/components/bucketItem/BucketItemList';
import { Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useFetchBucketFolderById } from '@/hooks/bucketlist/useFetchBucketFolderById';
import styled from '@emotion/styled';
import ConditionalRabbitIcon from '@/components/bucketItem/ConditionalRabbitIcon';

const BucketListItem: NextPageWithLayout = () => {
  const router = useRouter();
  const { folderId } = router.query;

  const { data } = useFetchBucketFolderById(Number(folderId));

  return (
    <>
      <ListWrapper>
        <Text textStyle={'h1'} marginBottom={'12px'} minHeight={'105px'}>
          {data?.title}
        </Text>
        <ConditionalRabbitIcon folderTitle={data?.title ?? ''} />
        <BucketItemList />
      </ListWrapper>
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

const ListWrapper = styled.div`
  padding: 0 20px;
`;

export default BucketListItem;
