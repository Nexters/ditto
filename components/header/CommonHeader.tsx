import styled from '@emotion/styled';
import React, { ReactNode } from 'react';

interface CommonHeaderProps {
  children: ReactNode;
}

const CommonHeader = ({ children }: CommonHeaderProps) => {
  return <CommonHeaderContainer>{children}</CommonHeaderContainer>;
};

const Left = ({ children }: CommonHeaderProps) => {
  return <LeftContainer>{children}</LeftContainer>;
};

const Right = ({ children }: CommonHeaderProps) => {
  return <RightContainer>{children}</RightContainer>;
};

export default Object.assign(CommonHeader, {
  Left,
  Right,
});

const CommonHeaderContainer = styled.header`
  position: absolute;
  top: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 420px;
  background-color: #fff;
  padding: 17px 20px;
  z-index: 10;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightContainer = styled.div``;
