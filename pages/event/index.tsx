import React, { RefObject, useEffect, useMemo, useRef, useState } from 'react';
import { Flex, Text, useDisclosure } from '@chakra-ui/react';
import { NextPageWithLayout } from '@/pages/_app';
import MainLayout from '@/components/layouts/MainLayout';
import EventModal from '@/components/modals/EventModal';
import { PlusWhiteIcon } from '@/components/icons';
import EventHeader from '@/components/header/EventHeader';
import theme from '@/styles/theme';
import styled from '@emotion/styled';
import { changedToEventDate, differenceInMillisecondsFromNow, today } from '@/utils/date';
import { useFetchEventList } from '@/hooks/Event/useFetchEventList';
import useChangeMode from '@/store/useChangeMode';
import { COMMON_HEADER_HEIGHT } from '@/components/header/CommonHeader';
import EmptyEvent from '@/components/event/EmptyEvent';
import { css } from '@emotion/react';
import { Event } from '@/lib/supabase/type';
import { CustomMenu } from '@/components/menus/CustomMenu';

const EVENT_FILTER = {
  all: 0,
  repeat: 1,
  exceptRepeat: 2,
} as const;

const EventFilterMenuList = [
  {
    id: EVENT_FILTER.all,
    name: '모든 일정',
  },
  {
    id: EVENT_FILTER.repeat,
    name: '반복 일정만',
  },
  {
    id: EVENT_FILTER.exceptRepeat,
    name: '반복 일정 제외',
  },
] as const;

// 다가오는 일정
const filterByComingEvent = (data: Event[]) =>
  data?.filter((v) => {
    if (today(v.start_time, v.end_time) && v.is_all_day) return true;
    return differenceInMillisecondsFromNow(v.end_time) > 0;
  });

// 지난 일정
const filterByPastEvent = (data: Event[]) =>
  data?.filter((v) => {
    if (today(v.start_time, v.end_time) && v.is_all_day) return false;
    return differenceInMillisecondsFromNow(v.end_time) <= 0;
  });

const Event: NextPageWithLayout = () => {
  const comingEvent = useRef<HTMLInputElement>(null);
  const pastEvent = useRef<HTMLInputElement>(null);
  const [isFirstCreatedEvent, setFirstCreatedEvent] = useState(false);
  const [isTriggerOnce, setTriggerOnce] = useState(true);
  const [filteredEvent, setFilterEvent] = useState<Event[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setMode } = useChangeMode();
  const [selectedMenuFilterId, setSelectMenuFilterId] = useState<number>(EVENT_FILTER.all);

  const { data: eventList } = useFetchEventList({
    onSuccess: (data) => {
      if (comingEvent.current?.checked) setFilterEvent(filterByComingEvent(data));
      if (pastEvent.current?.checked) setFilterEvent(filterByPastEvent(data));
    },
  });

  const handleClickEvent = (id: number) => () => {
    setMode('update', id);
    onOpen();
  };

  const handleFilterChip = (targetRef: RefObject<HTMLInputElement>) => () => {
    if (!targetRef.current) return;
    if (targetRef.current.checked) return;

    targetRef.current.checked = true;
    if (targetRef === comingEvent) {
      setFilterEvent(filterByComingEvent(eventList ?? []));
    } else {
      setFilterEvent(filterByPastEvent(eventList ?? []));
    }
  };

  const resetFirstCreatedEvent = () => setFirstCreatedEvent(false);

  useEffect(() => {
    if (eventList) {
      if (comingEvent.current?.checked) setFilterEvent(filterByComingEvent(eventList));
      if (pastEvent.current?.checked) setFilterEvent(filterByPastEvent(eventList));
      if (isTriggerOnce) setTriggerOnce(false);
    }
  }, [eventList, isTriggerOnce]);

  const renderData = useMemo(() => {
    if (filteredEvent?.length) {
      // 반복 일정만
      if (selectedMenuFilterId === EVENT_FILTER.repeat) return filteredEvent.filter((event) => event.is_annual);
      // 반복 일정 제외
      if (selectedMenuFilterId === EVENT_FILTER.exceptRepeat) return filteredEvent.filter((event) => !event.is_annual);
      // 모든 일정
      return filteredEvent;
    }
  }, [filteredEvent, selectedMenuFilterId]);

  return (
    <MainLayout
      header={<EventHeader />}
      headerHeight={COMMON_HEADER_HEIGHT}
      floatButton={
        eventList?.length !== 0 ? (
          <FAB onClick={onOpen}>
            <PlusWhiteIcon />
          </FAB>
        ) : null
      }
    >
      {eventList?.length === 0 ? (
        <ListContainer center>
          <EmptyEvent
            onClick={() => {
              onOpen();
              setFirstCreatedEvent(true);
            }}
          />
        </ListContainer>
      ) : (
        <ListContainer>
          {/* 필터 */}
          <Flex justifyContent="space-between" alignItems="center" marginBottom="4px">
            <Flex gap="8px">
              <label>
                <A11yInput type="radio" name="filter-chip" ref={comingEvent} defaultChecked={true} />
                <FilterChip onClick={handleFilterChip(comingEvent)}>예정된 일정</FilterChip>
              </label>
              <label>
                <A11yInput type="radio" name="filter-chip" ref={pastEvent} />
                <FilterChip onClick={handleFilterChip(pastEvent)}>완료된 일정</FilterChip>
              </label>
            </Flex>

            <CustomMenu
              items={EventFilterMenuList.map(({ id, name }) => ({
                id,
                name,
                selected: id === selectedMenuFilterId,
              }))}
              onClickItem={setSelectMenuFilterId}
            />
          </Flex>

          {/* 일정목록 */}
          {renderData?.map(
            ({ id, title, start_time: startTime, end_time: endTime, is_annual: isAnnual, is_all_day: isAllDay }) => (
              <ListItem key={id} onClick={handleClickEvent(id)}>
                <Flex flexDirection="column" gap="8px">
                  <Text textStyle="buttonMedium" color={theme.colors.secondary}>
                    {title}
                  </Text>
                  <Text textStyle="body3" fontWeight={500} color={theme.colors.grey[4]}>
                    {changedToEventDate(isAllDay, startTime, endTime)}
                  </Text>
                </Flex>
                <Flex>
                  {today(startTime, endTime) && <Chip type="allDay">오늘</Chip>}
                  {isAnnual && <Chip type="annual">매년</Chip>}
                </Flex>
              </ListItem>
            )
          )}
        </ListContainer>
      )}

      <EventModal
        isOpen={isOpen}
        onClose={onClose}
        isFirstCreatedEvent={isFirstCreatedEvent}
        resetFirstCreatedEvent={resetFirstCreatedEvent}
      />
    </MainLayout>
  );
};

Event.isProtectedPage = true;

export default Event;

const A11yInput = styled.input`
  position: absolute !important;
  overflow: hidden;
  clip: rect(0 0 0 0);
  width: 0.1rem;
  height: 0.1rem;
  white-space: nowrap;
`;

const FAB = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
  border-radius: 50px;
  background-color: ${theme.colors.black};
  filter: drop-shadow(1.88235px 3.76471px 2.82353px rgba(0, 0, 0, 0.2));
`;

const FilterChip = styled.button`
  display: inline-flex;
  align-items: flex-start;
  width: fit-content;
  padding: 11px 16px;
  ${theme.textStyles.buttonSmall};
  border-radius: 100px;

  ${A11yInput} ~ & {
    background-color: ${theme.colors.white};
    color: ${theme.colors.grey[3]};
    border: 1px solid ${theme.colors.grey[3]};
  }

  ${A11yInput}:checked ~ & {
    background-color: ${theme.colors.black};
    color: ${theme.colors.white};
  }
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
  &:hover,
  &:active {
    border: 1px solid ${theme.colors.orange};
    box-shadow: 0px 0px 15px rgba(245, 105, 60, 0.18);
  }
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
