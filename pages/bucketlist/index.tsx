import PageHeader from '@/components/layouts/Header';
import styled from '@emotion/styled';
import Link from 'next/link';
import React from 'react';

const BucketList = () => {
  return (
    <>
      <PageHeader />
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

const FolderList = styled.ul`
  display: flex;
  flex-direction: column;
`;

export default BucketList;
