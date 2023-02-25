import React, { Fragment } from 'react';
import { useFetchJoinedGroupList } from '@/hooks/group/useFetchJoinedGroupList';
import { useUser } from '@/store/useUser';
import { Menu, MenuButton, MenuList, MenuItem, forwardRef } from '@chakra-ui/react';
import { GrayDownIcon, PawIcon } from '../icons';
import styled from '@emotion/styled';
import theme from '@/styles/theme';

const GroupMenu = () => {
  const { user, selectedGroupId, setGroupId } = useUser();
  const { data: groupList } = useFetchJoinedGroupList(user);

  const currentGroupName = groupList?.find(({ id }) => id === selectedGroupId)?.name || '';

  const ForwardedCustomMenuButton = forwardRef((props, ref) => (
    <CustomMenuButton ref={ref} {...props}>
      {currentGroupName}
      <GrayDownIcon />
    </CustomMenuButton>
  ));

  return (
    <Menu>
      <MenuButton as={ForwardedCustomMenuButton} />
      <CustomMenuList>
        {groupList?.map(({ name, id }, index) => {
          const selected = id === selectedGroupId;
          const last = index === groupList.length - 1;
          return (
            <Fragment key={id}>
              <CustomMenuItem onClick={() => setGroupId(id)} selected={selected}>
                <CustomGroupName>{name}</CustomGroupName>
                {selected && <PawIcon width={18} height={18} />}
              </CustomMenuItem>
              {!last && <CustomMenuDivider />}
            </Fragment>
          );
        })}
      </CustomMenuList>
    </Menu>
  );
};

export default GroupMenu;

const CustomMenuButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  ${theme.textStyles.buttonSmall}
  color: ${theme.colors.grey[6]};
`;
const CustomMenuList = styled(MenuList)`
  width: 160px;
  min-width: 160px;
  padding: 0;
  margin-top: -4px;
  border-radius: 8px;
  background-color: ${theme.colors.white};
  overflow: hidden;
  box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.06);
`;
const CustomMenuItem = styled(MenuItem)<{ selected: boolean }>`
  padding: 12px;
  justify-content: space-between;

  ${theme.textStyles.buttonSmall}
  ${({ selected }) =>
    selected
      ? `color: ${theme.colors.white};
        background-color: ${theme.colors.grey[10]};`
      : `color: ${theme.colors.grey[6]};`};

  svg {
    filter: invert(1);
    flex-shrink: 0;
  }

  &:focus,
  &:active {
    --menu-bg: none;
  }
`;
const CustomGroupName = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const CustomMenuDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${theme.colors.grey[2]};
`;
