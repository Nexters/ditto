import theme from '@/styles/theme';
import { Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import React from 'react';

interface EmptyEventProps {
  onClick: () => void;
}

const EmptyEvent = ({ onClick }: EmptyEventProps) => (
  <EmptyEventWrap>
    <Text textStyle="h3" color="grey.6" marginBottom="17px" fontWeight={700}>
      아직 등록된 일정이 없어요
    </Text>
    <Text textStyle="body2" color="grey.4" marginBottom="43px">
      가장 먼저 일정을 등록해보세요!
    </Text>
    <Button onClick={onClick}>일정 만들어보기</Button>
  </EmptyEventWrap>
);

export default EmptyEvent;

const EmptyEventWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Button = styled.button`
  background-color: ${theme.colors.orange};
  ${theme.textStyles.buttonMedium};
  color: ${theme.colors.white};
  padding: 18px 32px;
  border-radius: 100px;
`;
