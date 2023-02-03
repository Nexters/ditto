import styled from '@emotion/styled';
import Link from 'next/link';
import React from 'react';
import PageHeader from '@/components/layouts/Header';
import MainLayout from '@/components/layouts/MainLayout';
import { NextPageWithLayout } from '@/pages/_app';
import { useFetchBucketFolders } from '@/hooks/useFetchBucketFolders';

const BucketList: NextPageWithLayout = () => {
  const { data, status } = useFetchBucketFolders();

  if (status === 'loading') return <div>로딩중</div>;
  if (status === 'error') return <div>에러 발생</div>;

  console.log(data);

  return (
    <>
      <h1>Bucket List</h1>
      <section>
        <h2>폴더 목록</h2>
        <FolderList>
          <Link href="/bucketlist/1">폴더1</Link>
          <Link href="/bucketlist/2">폴더2</Link>
        </FolderList>
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

const FolderList = styled.ul`
  display: flex;
  flex-direction: column;
`;

export default BucketList;
