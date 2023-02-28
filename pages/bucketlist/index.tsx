import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { NextPageWithLayout } from '@/pages/_app';
import BucketFolderList from '@/components/bucketFolder/BucketFolderList';
import { BucketlistHeader } from '@/components/header/BucketlistHeader';
import styled from '@emotion/styled';
import theme from '@/styles/theme';
import { COMMON_HEADER_HEIGHT } from '@/components/header/CommonHeader';

const BucketList: NextPageWithLayout = () => {
  return (
    <MainLayout header={<BucketlistHeader />} headerHeight={COMMON_HEADER_HEIGHT}>
      <ListContainer>
        <BucketFolderList />
      </ListContainer>
    </MainLayout>
  );
};

BucketList.isProtectedPage = true;

export default BucketList;

const ListContainer = styled.section`
  height: 100%;
  overflow: auto;
  background-color: ${theme.colors.grey[1]};
`;
