import theme from '@/styles/theme';
import styled from '@emotion/styled';
import { GroupMenu } from '../menus/GroupMenu';

export const MY_PAGE_HEADER_HEIGHT = 58;

export const MyPageHeader = () => {
  return (
    <MyPageHeaderWrap>
      My page
      <GroupMenu />
    </MyPageHeaderWrap>
  );
};

const MyPageHeaderWrap = styled.h1`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;

  height: ${MY_PAGE_HEADER_HEIGHT}px;
  padding: 0 20px;
  ${theme.textStyles.h3};
  border-bottom: 1px solid ${theme.colors.grey[2]};
`;
