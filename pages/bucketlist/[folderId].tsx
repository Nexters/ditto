import PageHeader from '@/components/layouts/Header';
import React from 'react';

const BucketListItem = () => {
  return (
    <>
      <PageHeader useBackButton />
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

export default BucketListItem;
