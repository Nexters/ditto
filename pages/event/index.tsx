import React from 'react';
import { Button, useDisclosure } from '@chakra-ui/react';
import { NextPageWithLayout } from '@/pages/_app';
import MainLayout from '@/components/layouts/MainLayout';
import EventModal from '@/components/modals/EventModal';
import { PlusWhiteIcon } from '@/components/icons';
import EventHeader from '@/components/header/EventHeader';

const Event: NextPageWithLayout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <MainLayout
      floatButton={
        <Button
          width="64px"
          height="64px"
          borderRadius={50}
          bgColor="black"
          filter="drop-shadow(1.88235px 3.76471px 2.82353px rgba(0, 0, 0, 0.2))"
          onClick={onOpen}
        >
          <PlusWhiteIcon />
        </Button>
      }
    >
      <PageHeader />
      <h1>일정</h1>
      <section>
        <h2>일정</h2>
      </section>

      <div style={{ width: '100%', height: 3000 }}></div>
      <EventModal isOpen={isOpen} onClose={onClose} />
    </MainLayout>
  );
};

Event.isProtectedPage = true;

export default Event;
