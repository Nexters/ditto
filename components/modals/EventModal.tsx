import React, { ChangeEvent, RefObject, useEffect, useRef, useState } from 'react';
import { Box, Button, Flex, Input, ModalBody, ModalFooter, Switch, Text } from '@chakra-ui/react';
import BaseModal from '@/components/modals/BaseModal';
// import TitleInput from '@/components/inputs/TitleInput';
import styled from '@emotion/styled';
import { ArrowRightIcon20, TrashCanIcon } from '../icons';
import { css } from '@emotion/react';
import { useToggleState } from '@/hooks/useToggleState';
import { formatToHHMM, formatToMMDD } from '@/utils/date';
// import ContentInput from '@/components/inputs/ContentInput';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * 일정 추가, 수정 모달
 */
const ModalContent = () => {
  const [isAllDay, toggleAllDay] = useToggleState();
  const [isAnnual, toggleAnnual] = useToggleState();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const startDatePicker = useRef<HTMLInputElement>(null);
  const endDatePicker = useRef<HTMLInputElement>(null);

  const handleChangeDate = (isStartDate: boolean) => (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const formattedDate = isAllDay ? formatToMMDD(value) : `${formatToMMDD(value)} ${formatToHHMM(value)}`;
    (isStartDate ? setStartDate : setEndDate)?.(formattedDate);
  };

  const handleClickButton = (target: RefObject<HTMLInputElement>) => () => {
    // showPicker는 safari에서 지원 X
    target.current?.showPicker();
  };

  useEffect(() => {
    setStartDate(isAllDay ? formatToMMDD() : `${formatToMMDD()} ${formatToHHMM()}`);
    setEndDate(isAllDay ? formatToMMDD() : `${formatToMMDD()} ${formatToHHMM()}`);
  }, [isAllDay]);

  return (
    <>
      {/* <TitleInput placeholder={'제목을 입력하세요'} height={94} /> */}
      <Divider height={6} />
      <ModalBody padding="16px 20px">
        <Flex justifyContent="space-between" marginBottom="26px">
          하루종일
          <Switch isChecked={isAllDay} onChange={toggleAllDay} />
        </Flex>
        <Flex justifyContent="space-between" alignItems="center" marginBottom="18px">
          <Button onClick={handleClickButton(startDatePicker)}>{startDate}</Button>
          <Input
            css={a11y}
            ref={startDatePicker}
            visibility="hidden"
            type={isAllDay ? 'date' : 'datetime-local'}
            onChange={handleChangeDate(true)}
          />
          <ArrowRightIcon20 />
          <Button onClick={handleClickButton(endDatePicker)}>{endDate}</Button>
          <Input
            css={a11y}
            ref={endDatePicker}
            visibility="hidden"
            type={isAllDay ? 'date' : 'datetime-local'}
            onChange={handleChangeDate(false)}
          />
        </Flex>
        <Divider />
        <Flex justifyContent="space-between" marginTop="24px" marginBottom="24px">
          매년 반복
          <Switch isChecked={isAnnual} onChange={toggleAnnual} />
        </Flex>
        <Divider />
        {/* <ContentInput placeholder={'설명을 입력하세요'} height={94} /> */}
        <Box display="inline-flex" flexDirection="column">
          <Text>팜하니 작성</Text>
          <Text>2023.01.12 12:43</Text>
        </Box>
      </ModalBody>
      <ModalFooter padding="20px" display="flex" justifyContent="space-between">
        <TrashCanIcon />
        <Button>추가하기</Button>
      </ModalFooter>
    </>
  );
};

const EventModal = ({ isOpen, onClose }: EventModalProps) => (
  <BaseModal isOpen={isOpen} onClose={onClose} modalContent={<ModalContent />} width={300} height={480} />
);

const Divider = styled.div<{ height?: number }>`
  width: 100%;
  height: ${({ height }) => height || 2}px;
  background-color: #f3f5f5;
`;

export default EventModal;

export const a11y = css`
  position: absolute !important;
  overflow: hidden;
  width: 0.1px;
  height: 0.1px;
`;
