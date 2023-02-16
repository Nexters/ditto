import React from 'react';
import { useFetchJoinedGroupList } from '@/hooks/useFetchJoinedGroupList';
import { useUser } from '@/store/useUser';
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
import { CheckIcon20, GrayDownIcon } from '../icons';

const GroupMenu = () => {
  const { user, selectedGroupId, setGroupId } = useUser();
  const { data: groupList } = useFetchJoinedGroupList(user);

  const currentGroupName = groupList?.find(({ id }) => id === selectedGroupId)?.name || '';

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<GrayDownIcon />}>
        {currentGroupName}
      </MenuButton>
      <MenuList>
        {groupList?.map(({ name, id }) => (
          <MenuItem key={id} onClick={() => setGroupId(id)}>
            {id === selectedGroupId ? <CheckIcon20 /> : null}
            {name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default GroupMenu;
