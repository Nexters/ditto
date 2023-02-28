import { ReactNode } from 'react';
import styled from '@emotion/styled';
import BottomNavigation, { BottomNavBarHeight } from './BottomNavigation';
import { COMMON_HEADER_HEIGHT } from '../header/CommonHeader';

type MainLayoutProps = {
  children: ReactNode;
  header?: ReactNode;
  floatButton?: ReactNode;
  hideBottomNavigation?: boolean;
};

const MainLayout = ({ children, header, floatButton, hideBottomNavigation = false }: MainLayoutProps) => {
  return (
    <MainContainer>
      {header}
      <MainSection hasHeader={!!header} hideBottomNavigation={hideBottomNavigation}>
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

const MainSection = styled.section<{ hasHeader?: boolean; hideBottomNavigation?: boolean }>`
  position: absolute;
  top: ${(props) => (props.hasHeader ? COMMON_HEADER_HEIGHT : 0)}px;
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
