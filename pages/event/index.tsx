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
import useChangeMode from '@/store/useChangeMode';
import { COMMON_HEADER_HEIGHT } from '@/components/header/CommonHeader';
import EmptyEvent from '@/components/event/EmptyEvent';
import { css } from '@emotion/react';

const Event: NextPageWithLayout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setMode } = useChangeMode();
  const { data } = useFetchEventList();

  const handleClickEvent = (id: number) => () => {
    setMode('update', id);
    onOpen();
  };

  return (
    <MainLayout
      header={<EventHeader />}
      headerHeight={COMMON_HEADER_HEIGHT}
      floatButton={
        <Button onClick={onOpen}>
          <PlusWhiteIcon />
        </Button>
      }
    >
      {data?.length === 0 ? (
        <ListContainer center>
          <EmptyEvent onClick={onOpen} />
        </ListContainer>
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

const ListContainer = styled.ul<{ center?: boolean }>`
  display: flex;
  flex-direction: column;
  ${({ center }) =>
    center &&
    css`
      align-items: center;
      justify-content: center;
    `}
  gap: 8px;
  padding: 12px 20px 80px;
  height: 100%;
  overflow: auto;
  background-color: ${theme.colors.grey[1]};
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
