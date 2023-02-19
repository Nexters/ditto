import React from 'react';
import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import { NextPageWithLayout } from '@/pages/_app';
import MainLayout from '@/components/layouts/MainLayout';
import EventModal from '@/components/modals/EventModal';
import { PlusWhiteIcon } from '@/components/icons';
import EventHeader from '@/components/header/EventHeader';
import theme from '@/styles/theme';

const EVENT_HEADER_HEIGHT = 98;

const Event: NextPageWithLayout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <MainLayout
      header={<EventHeader />}
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
      <Flex marginTop={`${EVENT_HEADER_HEIGHT}px`} minHeight="100%" width="100%" backgroundColor={theme.colors.grey[1]}>
        asc
      </Flex>
      <EventModal isOpen={isOpen} onClose={onClose} />
    </MainLayout>
  );
};

Event.isProtectedPage = true;

export default Event;
