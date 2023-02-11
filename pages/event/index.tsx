import React from 'react';
import { Button, useDisclosure } from '@chakra-ui/react';
import { NextPageWithLayout } from '@/pages/_app';
import PageHeader from '@/components/layouts/Header';
import MainLayout from '@/components/layouts/MainLayout';
import Image from 'next/image';
import Plus from 'public/plus.svg';
import { BottomNavBarHeight } from '@/components/layouts/BottomNavigation';
import styled from '@emotion/styled';
import EventModal from '@/components/modal/EventModal';

const Event: NextPageWithLayout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <h1>일정</h1>
      <section>
        <h2>일정</h2>
      </section>

      <div style={{ width: '100%', height: 1000 }}></div>

      <FixedContainer>
        <Button
          width="64px"
          height="64px"
          borderRadius={50}
          bgColor="black"
          filter="drop-shadow(1.88235px 3.76471px 2.82353px rgba(0, 0, 0, 0.2));"
          onClick={onOpen}
        >
          <Image src={Plus} alt="plus" />
        </Button>
      </FixedContainer>
      <EventModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

Event.getLayout = (page) => (
  <MainLayout>
    <PageHeader />
    {page}
  </MainLayout>
);
Event.isProtectedPage = true;

export default Event;

const FixedContainer = styled.div`
  position: fixed;
  bottom: ${BottomNavBarHeight + 13}px;
  transform: translateX(341px);
  display: flex;
  flex-direction: column;
  max-width: 420px;
  width: 100%;
  margin: 0 auto;
`;
