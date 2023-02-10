import React from 'react';
import { Button, useDisclosure } from '@chakra-ui/react';
import { NextPageWithLayout } from '@/pages/_app';
import PageHeader from '@/components/layouts/Header';
import MainLayout from '@/components/layouts/MainLayout';
import AddBucketFolderModal from '@/components/modal/AddBucketFolderModal';

const Event: NextPageWithLayout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <h1>일정</h1>
      <section>
        <h2>일정</h2>
      </section>

      <Button onClick={onOpen}>Open Modal</Button>
      <AddBucketFolderModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

Event.getLayout = (page) => (
  <MainLayout>
    <PageHeader />
    {page}
  </MainLayout>
);

export default Event;

export const getStaticProps = () => {
  return {
    props: {
      protected: true,
    },
  };
};
