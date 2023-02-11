import { ReactNode } from 'react';
import styled from '@emotion/styled';
import BottomNavigation from './BottomNavigation';

const MainLayout = ({
  children,
  hideBottomNavigation = false,
}: {
  children: ReactNode;
  hideBottomNavigation?: boolean;
}) => {
  return (
    <MainContainer>
      <MainSection>{children}</MainSection>
      {!hideBottomNavigation && <BottomNavigation />}
    </MainContainer>
  );
};

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  max-width: 420px;
  margin: 0 auto;
  min-height: 100vh;
`;

const MainSection = styled.section`
  position: relative;
  flex: 1;
`;

export default MainLayout;
