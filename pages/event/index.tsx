import React from 'react';
import { Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { NextPageWithLayout } from '@/pages/_app';
import MainLayout from '@/components/layouts/MainLayout';
import EventModal from '@/components/modals/EventModal';
import { PlusWhiteIcon } from '@/components/icons';
import EventHeader from '@/components/header/EventHeader';
import theme from '@/styles/theme';
import styled from '@emotion/styled';
import { dateChangeToEventFormat } from '@/utils/date';
import { useFetchEventList } from '@/hooks/Event/useFetchEventList';

const EVENT_HEADER_HEIGHT = 98;

const Event: NextPageWithLayout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data } = useFetchEventList();

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
        <ListContainer>
          {data?.map(
            ({ id, title, start_time: startTime, end_time: endTime, is_all_day: isAllDay, is_annual: isAnnual }) => (
              <ListItem key={id}>
                <Flex flexDirection="column" gap="8px">
                  <Text textStyle="buttonMedium" color={theme.colors.secondary}>
                    {title}
                  </Text>
                  <Text textStyle="body3" fontWeight={500} color={theme.colors.grey[4]}>
                    {dateChangeToEventFormat(startTime, endTime)}
                  </Text>
                </Flex>
                <Flex>
                  {isAllDay ? <Chip type="allDay">오늘</Chip> : null}
                  {isAnnual ? <Chip type="annual">매년</Chip> : null}
                </Flex>
              </ListItem>
            )
          )}
        </ListContainer>
      </Flex>
      <EventModal isOpen={isOpen} onClose={onClose} />
    </MainLayout>
  );
};

Event.isProtectedPage = true;

export default Event;

const ListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  height: 100%;
  padding: 12px 20px;
`;

const ListItem = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.grey[2]};
  border-radius: 12px;
  padding: 16px 15px 19px 16px;
  cursor: pointer;
`;

const Chip = styled.div<{ type: 'allDay' | 'annual' }>`
  display: inline-block;
  width: 100%;
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid ${theme.colors.orange};
  font-weight: 600;
  ${theme.textStyles.caption};
  & + div {
    margin-left: 6px;
  }

  ${({ type }) =>
    type === 'allDay'
      ? `
          color: ${theme.colors.white};
          background-color: ${theme.colors.orange};
        `
      : `
          color: ${theme.colors.orange};
          background: rgba(255, 84, 30, 0.1);
        `}
`;
