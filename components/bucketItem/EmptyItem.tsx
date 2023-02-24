import { Text } from '@chakra-ui/react';
import styled from '@emotion/styled';

const EmptyItem = () => {
  return (
    <EmptyWrapper>
      <Text textStyle={'h3'} color={'grey.6'}>
        아직 등록된 버킷리스트가 없어요
      </Text>
      <Text textStyle={'body3'} color={'grey.4'}>
        가장 먼저 등록해보세요!
      </Text>
    </EmptyWrapper>
  );
};

const EmptyWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: inherit;
  width: 100%;
  flex-direction: column;
  gap: 16px;
`;

export default EmptyItem;
