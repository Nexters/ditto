import { useFetchJoinedGroupList } from '@/hooks/group/useFetchJoinedGroupList';
import { useUser } from '@/store/useUser';
import { CustomMenu } from './CustomMenu';

export const GroupMenu = () => {
  const { user, selectedGroupId, setGroupId } = useUser();
  const { data: groupList } = useFetchJoinedGroupList(user);

  return (
    <CustomMenu
      items={groupList?.map(({ id, name }) => ({ id: String(id), name, selected: selectedGroupId === id }))}
      onClickItem={(id) => setGroupId(Number(id))}
    />
  );
};
