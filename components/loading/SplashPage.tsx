import theme from '@/styles/theme';
import styled from '@emotion/styled';
import { SplashLogoIcon, SplashLogoTextIcon } from '../icons';

export const SplashPage = () => {
  return (
    <Container>
      <SplashLogoIcon />
      <SplashLogoTextIcon />
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  background-color: ${theme.colors.white};
`;
