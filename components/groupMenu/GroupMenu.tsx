import React from 'react';
import { useFetchJoinedGroupList } from '@/hooks/useFetchJoinedGroupList';
import { useUser } from '@/store/useUser';
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
import { CheckIcon20, GrayDownIcon } from '../icons';

const GroupMenu = () => {
  const { user, selectedGroupId, setGroupId } = useUser();
  const { data: groupList } = useFetchJoinedGroupList(user);

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<GrayDownIcon />}>
        {groupList?.filter((v) => v.id === selectedGroupId)[0].name}
      </MenuButton>
      <MenuList>
        {groupList?.map(({ name, id }) => (
          <>
            <MenuItem key={id} onClick={() => setGroupId(id)}>
              {id === selectedGroupId ? <CheckIcon20 /> : null}
              {name}
            </MenuItem>
          </>
        ))}
      </MenuList>
    </Menu>
  );
};

export default GroupMenu;
