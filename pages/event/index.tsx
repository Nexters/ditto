import React from 'react';
import { Flex, Text, useDisclosure } from '@chakra-ui/react';
import { NextPageWithLayout } from '@/pages/_app';
import MainLayout from '@/components/layouts/MainLayout';
import EventModal from '@/components/modals/EventModal';
import { PlusWhiteIcon } from '@/components/icons';
import EventHeader from '@/components/header/EventHeader';
import theme from '@/styles/theme';
import styled from '@emotion/styled';
import { dateChangeToEventFormat } from '@/utils/date';
import { useFetchEventList } from '@/hooks/Event/useFetchEventList';
import { useUser } from '@/store/useUser';
import useChangeMode from '@/store/useChangeMode';
import EmptyEvent from '@/components/event/EmptyEvent';
import { BOTTOM_NAV_HEIGHT } from '@/components/layouts/BottomNavigation';

const EVENT_HEADER_HEIGHT = 98;

const Event: NextPageWithLayout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { selectedGroupId } = useUser();
  const { data } = useFetchEventList(Number(selectedGroupId), {
    enabled: !!selectedGroupId,
  });

  const { setMode } = useChangeMode();

  const handleClickEvent = (id: number) => () => {
    setMode('update', id);
    onOpen();
  };

  return (
    <MainLayout
      header={<EventHeader />}
      floatButton={
        <Button onClick={onOpen}>
          <PlusWhiteIcon />
        </Button>
      }
    >
      <EventContainer>
        {data?.length === 0 ? (
          <EmptyEvent onClick={onOpen} />
        ) : (
          <ListContainer>
            {data?.map(
              ({ id, title, start_time: startTime, end_time: endTime, is_all_day: isAllDay, is_annual: isAnnual }) => (
                <ListItem key={id} onClick={handleClickEvent(id)}>
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
        )}
      </EventContainer>
      <EventModal isOpen={isOpen} onClose={onClose} />
    </MainLayout>
  );
};

Event.isProtectedPage = true;

export default Event;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
  border-radius: 50px;
  background-color: ${theme.colors.black};
  filter: drop-shadow(1.88235px 3.76471px 2.82353px rgba(0, 0, 0, 0.2));
`;

const EventContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - ${EVENT_HEADER_HEIGHT}px - ${BOTTOM_NAV_HEIGHT}px);
  margin-top: ${EVENT_HEADER_HEIGHT}px;
  background-color: ${theme.colors.grey[1]};
`;

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
