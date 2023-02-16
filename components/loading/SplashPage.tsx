import styled from '@emotion/styled';
import { SplashLogoIcon } from '../icons';

export const SplashPage = () => {
  return (
    <Container>
      <SplashLogoIcon />
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
