import React from 'react';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from '@/pages/_app';
import PageHeader from '@/components/layouts/Header';
import MainLayout from '@/components/layouts/MainLayout';
import { useFetchBucketItems } from '@/hooks/useFetchBucketItems';

const BucketListItem: NextPageWithLayout = () => {
  const router = useRouter();
  const { folderId } = router.query;

  const { data, status } = useFetchBucketItems(Number(folderId));

  if (status === 'loading') return <div>로딩중</div>;
  if (status === 'error') return <div>에러 발생</div>;

  console.log(data);

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
