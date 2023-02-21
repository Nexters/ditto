import React, { ChangeEvent, useEffect, useState } from 'react';
import { Box, Button, Flex, ModalBody, ModalFooter, Switch, Text } from '@chakra-ui/react';
import BaseModal from '@/components/modals/BaseModal';
import styled from '@emotion/styled';
import { TrashCanIcon } from '../icons';
import { useToggleState } from '@/hooks/useToggleState';
import { useCreateEvent } from '@/hooks/Event/useCreateEvent';
import { useUser } from '@/store/useUser';
import theme from '@/styles/theme';
import TitleTextarea from '../inputs/TitleTextarea';
import ContentTextarea from '../inputs/ContentTextarea';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const now = new Date();
const offset = now.getTimezoneOffset() * 60 * 1000;
const KST = new Date(now.getTime() - offset);

// yyyy-mm-ddThh:mm:ss.SSSZ

// asis yyyy-mm-ddThh:mm
const yyyyMMddThhmm = KST.toISOString().split('.')[0].slice(0, -3);

// tobe yyyy-mm-ddThh:mm:00Z
// const yyyyMMddThhmm = `${KST.toISOString().split('.')[0].slice(0, -3)}:00Z`;

// asis yyyy-mm-dd
const yyyyMMdd = KST.toISOString().split('T')[0];

// tobe yyyy-mm-ddT00:00:00Z
// const yyyyMMdd = `${KST.toISOString().split('T')[0]}T00:00:00Z`;

/**
 * 일정 추가, 수정 모달
 */
const ModalContent = () => {
  const [isAllDay, toggleAllDay] = useToggleState();
  const [isAnnual, toggleAnnual] = useToggleState();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(() => yyyyMMdd);
  const [endDate, setEndDate] = useState(() => yyyyMMddThhmm);

  const { user, selectedGroupId } = useUser();
  const { mutate: createEvent } = useCreateEvent();

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
    createEvent({
      isAllDay,
      isAnnual,
      title,
      description,
      startTime: startDate,
      endTime: endDate,
      creatorId,
      groupId: selectedGroupId,
    });
  };

  useEffect(() => {
    setStartDate(isAllDay ? yyyyMMdd : yyyyMMddThhmm);
    setEndDate(isAllDay ? yyyyMMdd : yyyyMMddThhmm);
  }, [isAllDay]);

  return (
    <Form onSubmit={handleSubmit}>
      <TitleTextarea placeholder={'제목을 입력하세요'} onChange={handleChangeTitle} value={title} />
      <Divider height={6} />
      <ModalBody padding="16px 20px 0px">
        <Flex justifyContent="space-between" alignItems="center" marginBottom="20px">
          <Text textStyle="body1" fontWeight={600} color="grey.10">
            하루종일
          </Text>
          <CustomSwitch isChecked={isAllDay} onChange={toggleAllDay} />
        </Flex>
        <Flex flexDirection="column" marginBottom="18px">
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
        <Divider />
        <Flex justifyContent="space-between" alignItems="center" margin="16px 0">
          <Text textStyle="body1" fontWeight={600} color="grey.10">
            매년 반복
          </Text>
          <CustomSwitch isChecked={isAnnual} onChange={toggleAnnual} color="#FF541E" />
        </Flex>
        <Divider />
        <ContentTextarea
          placeholder={'설명을 입력하세요 (선택)'}
          height={68}
          marginTop="16px"
          onChange={handleChangeDescription}
          value={description}
        />
      </ModalBody>
      <Box position="absolute" bottom="66px" left="20px">
        <Text textStyle="caption" fontSize="13px" color="grey.4" marginBottom="6px">
          팜하니 작성
        </Text>
        <Text textStyle="caption" fontSize="13px" color="grey.4">
          2023.01.12 12:43
        </Text>
      </Box>
      <ModalFooter display="flex" justifyContent="space-between" padding="12px 20px 16px 16px">
        <TrashCanIcon cursor="pointer" disabled={startDate > endDate} onClick={() => console.log('z')} />
        <Button type="submit" isDisabled={startDate > endDate}>
          저장하기
        </Button>
      </ModalFooter>
    </Form>
  );
};

const EventModal = ({ isOpen, onClose }: EventModalProps) => (
  <BaseModal isOpen={isOpen} onClose={onClose} modalContent={<ModalContent />} width={300} height={500} />
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
  font-style: normal;

  // FIXME: theme.textStyles.buttonSmall 로 변경해야함
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;

  border: 1px solid #e2e2e2;
  border-radius: 6px;
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
