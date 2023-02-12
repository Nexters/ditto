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
  display: flex;
  justify-content: space-between;
  padding: 17px 20px;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightContainer = styled.div``;
