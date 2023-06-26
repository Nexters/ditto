import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Box, Button, Flex, ModalBody, ModalFooter, ModalHeader, Text } from '@chakra-ui/react';
import BaseModal from '@/components/modals/BaseModal';
import styled from '@emotion/styled';
import { useSwitchState } from '@/hooks/useSwitchState';
import { useCreateEvent } from '@/hooks/Event/useCreateEvent';
import { useUser } from '@/store/useUser';
import theme from '@/styles/theme';
import TitleTextarea from '../inputs/TitleTextarea';
import ContentTextarea from '../inputs/ContentTextarea';
import { eventDateForView, formatCreationDate, eventDateForSave } from '@/utils/date';
import useChangeMode from '@/store/useChangeMode';
import { useFetchEventById } from '@/hooks/Event/useFetchEvent';
import { CloseIcon, TrashCanIcon } from '../icons';
import { pickFirst } from '@/utils/array';
import { useUpdateEvent } from '@/hooks/Event/useUpdateEvent';
import { useDeleteEvent } from '@/hooks/Event/useDeleteEvent';
import { MAX_LENGTH__EVENT_DESCRIPTION, MAX_LENGTH__EVENT_TITLE } from '@/utils/const';
import { showConfetti } from '@/lib/confetti';
import { Switch } from '../common/switch';

interface ModalContentProps {
  onClose: () => void;
  isFirstCreatedEvent: boolean;
  resetFirstCreatedEvent: () => void;
}

/**
 * 일정 추가, 수정 모달
 */
const ModalContent = ({ onClose, isFirstCreatedEvent, resetFirstCreatedEvent }: ModalContentProps) => {
  // 일정 추가 관련
  const [isAllDay, setAllDay, toggleAllDay] = useSwitchState();
  const [isAnnual, setAnnual, toggleAnnual] = useSwitchState();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [startDate, setStartDate] = useState(eventDateForView(isAllDay));
  const [endDate, setEndDate] = useState(eventDateForView(isAllDay));
  const { user, selectedGroupId } = useUser();
  const { mutate: createEvent } = useCreateEvent({
    onSuccess: () => {
      onClose();
      if (isFirstCreatedEvent) {
        showConfetti();
        resetFirstCreatedEvent();
      }
    },
  });

  // 일정 수정 관련
  const { mode, selectedEventId, resetMode } = useChangeMode();
  const isUpdateMode = mode === 'update';

  const { data } = useFetchEventById(Number(selectedEventId), {
    enabled: !!selectedEventId && isUpdateMode,
  });
  const prevData = pickFirst(data);

  const { mutate: updateEvent } = useUpdateEvent({
    onSuccess: () => closeModal(),
  });

  // 일정 삭제 관련
  const { mutate: deleteEvent } = useDeleteEvent({
    onSuccess: () => closeModal(),
  });

  useEffect(() => {
    setStartDate(isUpdateMode ? eventDateForView(isAllDay, prevData?.start_time) : eventDateForView(isAllDay));
    setEndDate(isUpdateMode ? eventDateForView(isAllDay, prevData?.end_time) : eventDateForView(isAllDay));
  }, [isAllDay, isUpdateMode, prevData?.end_time, prevData?.start_time]);

  useEffect(() => {
    if (isUpdateMode && prevData) {
      setTitle(prevData.title);
      setDescription(prevData.description);
      setStartDate(eventDateForView(isAllDay, prevData?.start_time));
      setEndDate(eventDateForView(isAllDay, prevData?.end_time));
      setAllDay(prevData?.is_all_day);
      setAnnual(prevData?.is_annual);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdateMode, prevData]);

  const handleChangeDate = (isStartDate: boolean) => (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (isStartDate) setStartDate(value);
    else setEndDate(value);
  };

  const handleChangeTitle = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setTitle(value.slice(0, MAX_LENGTH__EVENT_TITLE));
  };

  const handleChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setDescription(value.slice(0, MAX_LENGTH__EVENT_DESCRIPTION));
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const creatorId = user?.id;
    if (!title.trim() || !creatorId || !selectedGroupId) return;
    if (isUpdateMode) {
      updateEvent({
        id: selectedEventId,
        title,
        description,
        isAllDay,
        isAnnual,
        startTime: eventDateForSave(isAllDay, startDate),
        endTime: eventDateForSave(isAllDay, endDate),
        sequence: (prevData?.sequence ?? 0) + 1,
        updatedTime: new Date().toISOString(),
      });
    } else {
      createEvent({
        creatorId,
        groupId: selectedGroupId,
        title,
        description,
        isAllDay,
        isAnnual,
        startTime: eventDateForSave(isAllDay, startDate),
        endTime: eventDateForSave(isAllDay, endDate),
      });
    }
  };

  const handledDeleteEvent = () => {
    if (selectedEventId) deleteEvent(selectedEventId);
  };

  const closeModal = useCallback(() => {
    resetMode();
    onClose();
  }, [onClose, resetMode]);

  const handleEscapeKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === 'Escape') closeModal();
    },
    [closeModal]
  );

  useEffect(() => {
    addEventListener('keydown', handleEscapeKeyDown);
    return () => {
      removeEventListener('keydown', handleEscapeKeyDown);
    };
  }, [handleEscapeKeyDown]);

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
          <Switch isChecked={isAllDay} onChange={toggleAllDay} />
        </Flex>
        <Flex flexDirection="column" marginBottom="16px">
          <Flex justifyContent="space-between" alignItems="center" marginBottom="10px">
            <Text color="#FF541E">시작</Text>
            <DateInput
              type={isAllDay ? 'date' : 'datetime-local'}
              onChange={handleChangeDate(true)}
              value={startDate}
            />
          </Flex>
          <Flex justifyContent="space-between" alignItems="center">
            <Text color="#FF541E">종료</Text>
            <DateInput type={isAllDay ? 'date' : 'datetime-local'} onChange={handleChangeDate(false)} value={endDate} />
          </Flex>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center" padding="16px 0">
          <Text textStyle="body1" fontWeight={600} color="grey.10">
            매년 반복
          </Text>
          <Switch isChecked={isAnnual} onChange={toggleAnnual} color="#FF541E" />
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
              {prevData.users?.nickname} 작성
            </Text>
            <Text textStyle="caption" fontSize="13px" color="grey.4">
              {formatCreationDate(prevData.created_time)}
            </Text>
          </Flex>
        )}
      </ModalBody>
      <ModalFooter display="flex" justifyContent="space-between" padding="12px 20px 16px 16px">
        {isUpdateMode ? (
          <TrashCanIcon cursor="pointer" onClick={handledDeleteEvent} />
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

const EventModal = ({
  isOpen,
  onClose,
  isFirstCreatedEvent,
  resetFirstCreatedEvent,
}: {
  isOpen: boolean;
  onClose: () => void;
  isFirstCreatedEvent: boolean;
  resetFirstCreatedEvent: () => void;
}) => (
  <BaseModal
    isOpen={isOpen}
    onClose={onClose}
    closeOnOverlayClick={false}
    modalContent={
      <ModalContent
        onClose={onClose}
        isFirstCreatedEvent={isFirstCreatedEvent}
        resetFirstCreatedEvent={resetFirstCreatedEvent}
      />
    }
    width={300}
    height={512}
  />
);

export default EventModal;

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

export const DateInput = styled.input`
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
