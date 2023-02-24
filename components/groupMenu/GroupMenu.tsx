import React from 'react';
import { useFetchJoinedGroupList } from '@/hooks/group/useFetchJoinedGroupList';
import { useUser } from '@/store/useUser';
import { Menu, MenuButton, MenuList, MenuItem, forwardRef } from '@chakra-ui/react';
import { GrayDownIcon, PawIcon } from '../icons';
import styled from '@emotion/styled';

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
        {groupList?.map(({ name, id }) => {
          const selected = id === selectedGroupId;
          return (
            <CustomMenuItem key={id} onClick={() => setGroupId(id)} selected={selected}>
              {name}
              {selected && <PawIcon width={18} height={18} />}
            </CustomMenuItem>
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

  ${(props) => props.theme.textStyles.buttonSmall}
  color: ${(props) => props.theme.colors.grey[6]};
`;
const CustomMenuList = styled(MenuList)`
  width: 160px;
  min-width: 160px;
  padding: 0;
  margin-top: -4px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.white};
  overflow: hidden;
`;
const CustomMenuItem = styled(MenuItem)<{ selected: boolean }>`
  padding: 12px;
  justify-content: space-between;
  ${(props) => props.theme.textStyles.buttonSmall}
  ${(props) =>
    props.selected
      ? `color: ${props.theme.colors.white};
        background-color: ${props.theme.colors.grey[10]};`
      : `color: ${props.theme.colors.grey[6]};`};

  svg {
    filter: invert(1);
  }

  &:focus,
  &:active {
    --menu-bg: none;
  }
`;
