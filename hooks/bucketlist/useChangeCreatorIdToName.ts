import { useUser } from '@/store/useUser';
import { useFetchMemberList } from '@/hooks/member/useFetchMemberList';

const useChangeCreatorIdToName = () => {
  const { user, selectedGroupId } = useUser();
  const { data: userList } = useFetchMemberList(user, selectedGroupId);

  const changeCreatorIdToName = (creatorId: number) => {
    if (!userList) return;
    const creator = userList.find((user) => user.id === creatorId);
    return creator?.nickname ?? '알 수 없음';
  };

  return { changeCreatorIdToName };
};

export default useChangeCreatorIdToName;
