import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Button, Flex, ModalBody, ModalFooter, ModalHeader, Switch, Text, useDisclosure } from '@chakra-ui/react';
import BaseModal from '@/components/modals/BaseModal';
import styled from '@emotion/styled';
import { useUser } from '@/store/useUser';
import theme from '@/styles/theme';
import TitleTextarea from '../inputs/TitleTextarea';
import ContentTextarea from '../inputs/ContentTextarea';
import { formatCreationDate, createDate, formatISOForDateInput } from '@/utils/date';
import { CloseIcon, TrashCanIcon } from '../icons';
import { useCreateEvent } from '@/hooks/Event/useCreateEvent';
import { useUpdateEvent } from '@/hooks/Event/useUpdateEvent';
import { useDeleteEvent } from '@/hooks/Event/useDeleteEvent';
import { MAX_LENGTH__EVENT_DESCRIPTION, MAX_LENGTH__EVENT_TITLE } from '@/utils/const';
import { showConfetti } from '@/lib/confetti';
import { add } from 'date-fns';
import { useFetchMemberList } from '@/hooks/member/useFetchMemberList';
import { Event } from '@/lib/supabase/type';

type EventModalContentProps = {
  isShowConfetti?: boolean;
  prevData?: Event;
  closeModal: () => void;
};

/**
 * 일정 추가, 수정 모달
 */
const EventModalContent = ({ prevData, isShowConfetti, closeModal }: EventModalContentProps) => {
  const { user, selectedGroupId } = useUser();
  const { data: memberList } = useFetchMemberList(selectedGroupId);

  const [title, setTitle] = useState(prevData?.title ?? '');
  const [description, setDescription] = useState(prevData?.description ?? '');
  const [startDate, setStartDate] = useState<Date>(
    prevData?.start_time ? new Date(prevData?.start_time) : createDate(1)
  );
  const [endDate, setEndDate] = useState<Date>(prevData?.end_time ? new Date(prevData?.end_time) : createDate(2));
  const [isAllDay, setAllDay] = useState(prevData?.is_all_day ?? false);
  const [isAnnual, setAnnual] = useState(prevData?.is_annual ?? false);

  const { mutate: createEvent } = useCreateEvent({
    onSuccess: () => {
      closeModal();
      if (isShowConfetti) {
        showConfetti();
      }
    },
  });

  // 일정 수정 관련
  const { mutate: updateEvent } = useUpdateEvent({ onSuccess: closeModal });

  // 일정 삭제 관련
  const { mutate: deleteEvent } = useDeleteEvent({ onSuccess: closeModal });

  const isUpdateMode = !!prevData;
  const creatorNickname = useMemo(
    () => memberList?.find((member) => member.id === prevData?.creator_id)?.nickname ?? '',
    [memberList, prevData?.creator_id]
  );

  const handleChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value.slice(0, MAX_LENGTH__EVENT_TITLE));
  };

  const handleChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value.slice(0, MAX_LENGTH__EVENT_DESCRIPTION));
  };

  const handleChangeStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextStartDate = new Date(e.target.value);
    setStartDate(nextStartDate);
    if (nextStartDate >= endDate) {
      setEndDate(add(nextStartDate, { hours: 1 }));
    }
  };

  const handleChangeEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextEndDate = new Date(e.target.value);
    setEndDate(nextEndDate);
    if (nextEndDate <= startDate) {
      setStartDate(add(nextEndDate, { hours: -1 }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const selectedEventId = prevData?.id;
    const creatorId = user?.id;

    if (!title.trim() || !creatorId || !selectedGroupId) return;

    if (isUpdateMode) {
      if (!selectedEventId) return;

      return updateEvent({
        id: selectedEventId,
        title,
        description,
        isAllDay,
        isAnnual,
        startTime: startDate.toISOString(),
        endTime: endDate.toISOString(),
      });
    }

    return createEvent({
      creatorId,
      groupId: selectedGroupId,
      title,
      description,
      isAllDay,
      isAnnual,
      startTime: startDate.toISOString(),
      endTime: endDate.toISOString(),
    });
  };

  const handleDeleteEvent = () => {
    const selectedEventId = prevData?.id;

    if (!isUpdateMode || !selectedEventId) return;

    deleteEvent(selectedEventId);
  };

  useEffect(() => {
    const handleEscapeKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') closeModal();
    };

    window.addEventListener('keydown', handleEscapeKeyDown);
    return () => window.removeEventListener('keydown', handleEscapeKeyDown);
  }, [closeModal]);

  return (
    <Form onSubmit={handleSubmit}>
      <ModalHeader padding="14px 18px 0 18px">
        <CloseIcon width={18} height={18} cursor="pointer" onClick={closeModal} />
      </ModalHeader>

      <TitleTextarea
        placeholder="제목을 입력하세요"
        maxLength={MAX_LENGTH__EVENT_TITLE}
        onChange={handleChangeTitle}
        value={title}
        padding="13px 20px !important"
        height="80px"
        border="none !important"
      />
      <Divider height={6} />

      <ModalBody display="flex" flexDirection="column" padding="16px 20px 0px">
        <Flex justifyContent="space-between" alignItems="center" marginBottom="20px">
          <Text textStyle="body1" fontWeight={600} color="grey.10">
            하루종일
          </Text>
          <CustomSwitch isChecked={isAllDay} onChange={(e) => setAllDay(e.target.checked)} />
        </Flex>

        <Flex flexDirection="column" marginBottom="16px">
          <Flex justifyContent="space-between" alignItems="center" marginBottom="10px">
            <Text color="#FF541E">시작</Text>
            <DateInput
              type={isAllDay ? 'date' : 'datetime-local'}
              value={formatISOForDateInput(isAllDay, startDate)}
              onChange={handleChangeStartDate}
            />
          </Flex>

          <Flex justifyContent="space-between" alignItems="center">
            <Text color="#FF541E">종료</Text>
            <DateInput
              type={isAllDay ? 'date' : 'datetime-local'}
              value={formatISOForDateInput(isAllDay, endDate)}
              onChange={handleChangeEndDate}
            />
          </Flex>
        </Flex>

        <Flex justifyContent="space-between" alignItems="center" padding="16px 0">
          <Text textStyle="body1" fontWeight={600} color="grey.10">
            매년 반복
          </Text>
          <CustomSwitch isChecked={isAnnual} onChange={(e) => setAnnual(e.target.checked)} color="#FF541E" />
        </Flex>

        <ContentTextarea
          placeholder="설명을 입력하세요 (선택)"
          maxLength={MAX_LENGTH__EVENT_DESCRIPTION}
          height={68}
          marginTop="12px"
          onChange={handleChangeDescription}
          value={description}
        />

        {isUpdateMode && prevData && (
          <Flex justifyContent="flex-end" marginTop="auto">
            <Text textStyle="caption" fontSize="13px" color="grey.4" marginRight="10px">
              {creatorNickname} 작성
            </Text>
            <Text textStyle="caption" fontSize="13px" color="grey.4">
              {formatCreationDate(prevData.created_time)}
            </Text>
          </Flex>
        )}
      </ModalBody>

      <ModalFooter display="flex" justifyContent="space-between" padding="12px 20px 16px 16px">
        {isUpdateMode ? (
          <TrashCanIcon cursor="pointer" onClick={handleDeleteEvent} />
        ) : (
          <Box width="32px" height="32px" />
        )}
        <Button type="submit" isDisabled={startDate > endDate || !startDate || !endDate || !title.trim()}>
          저장하기
        </Button>
      </ModalFooter>
    </Form>
  );
};

type EventModalProps = {
  prevData?: Event;
  isOpen: boolean;
  isShowConfetti?: boolean;
  onClose: () => void;
};

const EventModal = ({ prevData, isOpen, isShowConfetti, onClose }: EventModalProps) => (
  <BaseModal
    isOpen={isOpen}
    onClose={onClose}
    closeOnOverlayClick={false}
    modalContent={<EventModalContent prevData={prevData} isShowConfetti={isShowConfetti} closeModal={onClose} />}
    width={300}
    height={512}
  />
);

export const useEventModal = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | undefined>();
  const [isShowConfetti, setShowConfetti] = useState<boolean>(false);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const openEventModal = useCallback(
    (event?: Event, isShowConfetti = false) => {
      setSelectedEvent(event);
      setShowConfetti(isShowConfetti);
      onOpen();
    },
    [onOpen]
  );

  const closeEventModal = useCallback(() => {
    setSelectedEvent(undefined);
    setShowConfetti(false);
    onClose();
  }, [onClose]);

  const renderEventModal = useCallback(() => {
    return <EventModal isOpen={isOpen} isShowConfetti={isShowConfetti} prevData={selectedEvent} onClose={onClose} />;
  }, [isOpen, isShowConfetti, onClose, selectedEvent]);

  return { openEventModal, closeEventModal, renderEventModal };
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Divider = styled.div<{ height?: number }>`
  width: 100%;
  height: ${({ height }) => height || 2}px;
  background-color: #f3f5f5;
`;

const DateInput = styled.input`
  box-sizing: border-box;
  width: 224px;
  height: 36px;
  padding: 11px 12px 11px 16px;
  background: #f6f8f9;
  border: 1px solid #e2e2e2;
  border-radius: 6px;
  ${theme.textStyles.buttonSmall};
  color: ${theme.colors.black};
  cursor: pointer;
`;

const CustomSwitch = styled(Switch)`
  --switch-track-width: 34px;
  & > span {
    width: 32px;
    height: 14px;
    &[data-checked] {
      --switch-bg: ${theme.colors.orange};
    }
    & > span {
      width: 14px;
      height: 14px;
    }
  }
`;
