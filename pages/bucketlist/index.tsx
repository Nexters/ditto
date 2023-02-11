import React from 'react';
import PageHeader from '@/components/layouts/Header';
import MainLayout from '@/components/layouts/MainLayout';
import { NextPageWithLayout } from '@/pages/_app';
import BucketFolderList from '@/components/bucketFolder/BucketFolderList';
import { FlagIcon } from '@/components/icons';
import { Box, Divider, Text } from '@chakra-ui/react';

const BucketList: NextPageWithLayout = () => {
  return (
    <>
      <Box style={HeaderStyle}>
        <Text textStyle={'h2'} alignSelf={'flex-end'}>
          버킷리스트
        </Text>
        <FlagIcon />
      </Box>
      <Box bg={'grey.1'}>
        <Divider borderColor={'divider'} marginTop={'20px'} />
        <BucketFolderList />
      </Box>
    </>
  );
};

const HeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

BucketList.getLayout = (page) => (
  <MainLayout>
    <PageHeader />
    {page}
  </MainLayout>
);
BucketList.isProtectedPage = true;

export default BucketList;
