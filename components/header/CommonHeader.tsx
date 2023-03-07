import theme from '@/styles/theme';
import { Heading } from '@chakra-ui/react';
import styled from '@emotion/styled';
import React, { ReactNode } from 'react';
import { GroupMenu } from '../menus/GroupMenu';

interface CommonHeaderProps {
  title: string;
  icon: ReactNode;
}

export const COMMON_HEADER_HEIGHT = 94;

const CommonHeader = ({ title, icon }: CommonHeaderProps) => {
  return (
    <CommonHeaderContainer>
      <LeftContainer>
        <GroupMenu />
        <Heading fontSize={'24px'} lineHeight={1} fontWeight={700} letterSpacing={-0.02}>
          {title}
        </Heading>
      </LeftContainer>

      <RightContainer>{icon}</RightContainer>
    </CommonHeaderContainer>
  );
};

export default CommonHeader;

const CommonHeaderContainer = styled.header`
  width: 100%;
  height: ${COMMON_HEADER_HEIGHT}px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 20px;
  background-color: #fff;
  border-bottom: 1px solid ${theme.colors.grey[2]};
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 14px;
`;

const RightContainer = styled.div``;
