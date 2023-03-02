import { useUser } from '@/store/useUser';
import { useFetchMemberList } from '@/hooks/member/useFetchMemberList';

const useChangeCreatorIdToName = () => {
  const { selectedGroupId } = useUser();
  const { data: memberList } = useFetchMemberList(selectedGroupId);

  const changeCreatorIdToName = (creatorId: number) => {
    const creator = memberList?.find((user) => user.id === creatorId);
    return creator?.nickname ?? '알 수 없음';
  };

  return { changeCreatorIdToName };
};

export default useChangeCreatorIdToName;
