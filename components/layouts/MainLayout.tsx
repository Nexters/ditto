import { ReactNode } from 'react';
import styled from '@emotion/styled';
import BottomNavigation, { BottomNavBarHeight } from './BottomNavigation';

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
  position: relative;
  max-width: 420px;
  min-height: 100vh;
  margin: 0 auto;
`;

const MainSection = styled.section`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: ${BottomNavBarHeight}px;
  overflow: auto;
`;

export default MainLayout;
