import PageHeader from '@/components/layouts/Header';
import MainLayout from '@/components/layouts/MainLayout';
import React from 'react';

const BucketListItem = () => {
  return (
    <MainLayout>
      <PageHeader useBackButton />
      <h1>Bucket Item</h1>
      <section>
        <h2>버킷리스트</h2>
        <ul>
          <li>버킷리스트 아이템 1</li>
          <li>버킷리스트 아이템 2</li>
        </ul>
      </section>
    </MainLayout>
  );
};

export default BucketListItem;
