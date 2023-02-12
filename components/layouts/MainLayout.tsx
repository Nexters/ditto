import { ReactNode } from 'react';
import styled from '@emotion/styled';
import BottomNavigation, { BottomNavBarHeight } from './BottomNavigation';

const MainLayout = ({
  children,
  header,
  floatButton,
  hideBottomNavigation = false,
}: {
  children: ReactNode;
  header?: ReactNode;
  floatButton?: ReactNode;
  hideBottomNavigation?: boolean;
}) => {
  return (
    <MainContainer>
      {header}
      <MainSection hideBottomNavigation={hideBottomNavigation}>
        {children}
      </MainSection>
      {floatButton && <FloatButtonContainer>{floatButton}</FloatButtonContainer>}
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

const MainSection = styled.section<{ hideBottomNavigation?: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: ${(props) => (props.hideBottomNavigation ? 0 : BottomNavBarHeight)}px;
  overflow: auto;
`;

const FloatButtonContainer = styled.div`
  position: absolute;
  right: 15px;
  bottom: ${BottomNavBarHeight + 5}px;
`;

export default MainLayout;
