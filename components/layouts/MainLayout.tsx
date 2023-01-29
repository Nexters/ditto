import { ReactNode } from 'react';
import styled from '@emotion/styled';
import BottomNavigation from './BottomNavigation';

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <MainContainer>
      <MainSection>{children}</MainSection>
      <BottomNavigation />
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
  flex: 1;
`;

export default MainLayout;
