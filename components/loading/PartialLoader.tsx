import { Spinner } from '@chakra-ui/react';
import styled from '@emotion/styled';

const PartialLoader = () => {
  return (
    <SpinnerWrapper>
      <Spinner color={'grey.1'} />
    </SpinnerWrapper>
  );
};

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: inherit;
  width: 100%;
`;

export default PartialLoader;
