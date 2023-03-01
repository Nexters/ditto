import { ReactNode } from 'react';
import styled from '@emotion/styled';
import BottomNavigation, { BottomNavBarHeight } from './BottomNavigation';

type MainLayoutProps = {
  children: ReactNode;
  header?: ReactNode;
  headerHeight?: number;
  floatButton?: ReactNode;
  hideBottomNavigation?: boolean;
};

const MainLayout = ({
  children,
  header,
  headerHeight = 0,
  floatButton,
  hideBottomNavigation = false,
}: MainLayoutProps) => {
  return (
    <MainContainer>
      {header}
      <MainSection headerHeight={headerHeight} bottomNavHeight={hideBottomNavigation ? 0 : BottomNavBarHeight}>
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
  min-height: calc(var(--vh, 1vh) * 100);
  margin: 0 auto;
`;

const MainSection = styled.section<{ headerHeight: number; bottomNavHeight: number }>`
  position: absolute;
  top: ${(props) => props.headerHeight}px;
  left: 0;
  right: 0;
  bottom: ${(props) => props.bottomNavHeight}px;
  overflow: auto;
`;

const FloatButtonContainer = styled.div`
  position: absolute;
  right: 15px;
  bottom: ${BottomNavBarHeight + 5}px;
`;

export default MainLayout;
