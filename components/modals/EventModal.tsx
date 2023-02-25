import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import { Box, Button, Flex, ModalBody, ModalFooter, ModalHeader, Switch, Text } from '@chakra-ui/react';
import BaseModal, { BaseModalProps } from '@/components/modals/BaseModal';
import styled from '@emotion/styled';
import { useToggleState } from '@/hooks/useToggleState';
import { useCreateEvent } from '@/hooks/Event/useCreateEvent';
import { useUser } from '@/store/useUser';
import theme from '@/styles/theme';
import TitleTextarea from '../inputs/TitleTextarea';
import ContentTextarea from '../inputs/ContentTextarea';
import { forViewEventDate, dateChangeToyyyyMMddhhmm, forSaveEventDate } from '@/utils/date';
import useChangeMode from '@/store/useChangeMode';
import { useFetchEventById } from '@/hooks/Event/useFetchEvent';
import { CloseIcon, TrashCanIcon } from '../icons';
import { pickFirst } from '@/utils/array';
interface ModalContentProps {
  onClose: () => void;
}

/**
 * 일정 추가, 수정 모달
 */
const ModalContent = ({ onClose }: ModalContentProps) => {
  // 일정 추가 관련
  const [isAllDay, toggleAllDay, setAllDay] = useToggleState();
  const [isAnnual, toggleAnnual, setAnnual] = useToggleState();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [startDate, setStartDate] = useState(forViewEventDate().yyyyMMdd);
  const [endDate, setEndDate] = useState(forViewEventDate().yyyyMMdd);

  // 일정 수정 관련
  const { mode, selectedEventId, resetMode } = useChangeMode();
  const isUpdateMode = mode === 'update';
  const { data } = useFetchEventById(Number(selectedEventId), {
    enabled: !!selectedEventId && isUpdateMode,
  });
  const prevData = pickFirst(data);
  const { user, selectedGroupId } = useUser();
  const { mutate: createEvent } = useCreateEvent();

  useEffect(() => {
    setStartDate(
      isAllDay
        ? (isUpdateMode ? forViewEventDate(prevData?.start_time) : forViewEventDate()).yyyyMMdd
        : (isUpdateMode ? forViewEventDate(prevData?.start_time) : forViewEventDate()).yyyyMMddThhmm
    );
    setEndDate(
      isAllDay
        ? (isUpdateMode ? forViewEventDate(prevData?.end_time) : forViewEventDate()).yyyyMMdd
        : (isUpdateMode ? forViewEventDate(prevData?.end_time) : forViewEventDate()).yyyyMMddThhmm
    );
  }, [isAllDay, isUpdateMode, prevData?.end_time, prevData?.start_time]);

  useEffect(() => {
    if (isUpdateMode && prevData) {
      setTitle(prevData.title);
      setDescription(prevData.description);
      setStartDate(
        isAllDay
          ? forViewEventDate(prevData?.start_time).yyyyMMdd
          : forViewEventDate(prevData?.start_time).yyyyMMddThhmm
      );
      setEndDate(
        isAllDay ? forViewEventDate(prevData?.end_time).yyyyMMdd : forViewEventDate(prevData?.end_time).yyyyMMddThhmm
      );
      setAllDay(prevData?.is_all_day);
      setAnnual(prevData?.is_annual);
    }
  }, [isUpdateMode, prevData]);

  const handleChangeDate = (isStartDate: boolean) => (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (isStartDate) setStartDate(value);
    else setEndDate(value);
  };

  const handleChangeTitle = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setTitle(value);
  };

  const handleChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setDescription(value);
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const creatorId = user?.id;
    if (!title.trim() || !creatorId || !selectedGroupId) return;
    if (isUpdateMode) {
      // updateEvent mutate
    } else {
      createEvent({
        isAllDay,
        isAnnual,
        title,
        description,
        startTime: isAllDay ? forSaveEventDate(startDate).yyyyMMdd : forSaveEventDate(startDate).yyyyMMddThhmm,
        endTime: isAllDay ? forSaveEventDate(endDate).yyyyMMdd : forSaveEventDate(endDate).yyyyMMddThhmm,
        creatorId,
        groupId: selectedGroupId,
      });
    }
    onClose();
  };

  const handledDeleteEvent = () => {
    // deleteEvent mutate
  };

  const handleCloseModal = () => {
    onClose();
    resetMode();
  };

  const handleEscapeKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.code === 'Escape') handleCloseModal();
  };

  return (
    <Form onSubmit={handleSubmit} onKeyDown={handleEscapeKeyDown}>
      <ModalHeader padding="14px 18px 0 18px">
        <CloseIcon width={18} height={18} cursor="pointer" onClick={handleCloseModal} />
      </ModalHeader>
      <TitleTextarea
        placeholder="제목을 입력하세요"
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
          <CustomSwitch isChecked={isAllDay} onChange={toggleAllDay} />
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
          <CustomSwitch isChecked={isAnnual} onChange={toggleAnnual} color="#FF541E" />
        </Flex>
        <ContentTextarea
          placeholder="설명을 입력하세요 (선택)"
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
              {dateChangeToyyyyMMddhhmm(prevData.created_time)}
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

const EventModal = ({ isOpen, onClose }: BaseModalProps) => (
  <BaseModal
    isOpen={isOpen}
    onClose={onClose}
    closeOnOverlayClick={false}
    modalContent={<ModalContent onClose={onClose} />}
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
