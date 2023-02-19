import { useFetchMemberList } from '@/hooks/member/useFetchMemberList';
import { useUser } from '@/store/useUser';
import { Button } from '@chakra-ui/button';
import styled from '@emotion/styled';
import { MemberItem } from './MemberItem';

export const MemberList = () => {
  const { user, selectedGroupId } = useUser();
  const { data } = useFetchMemberList(user, selectedGroupId);

  if (!user) return null;
  return (
    <MemberListWrap>
      <MemberListHeader>멤버 리스트</MemberListHeader>
      <MemberItem key={user.id} nickname={user.nickname} profileImage={user.profile_image} isMe />
      {data?.map((member) => (
        <MemberItem key={member.id} nickname={member.nickname} profileImage={member.profile_image} />
      ))}
      <AddMemberButton>멤버 추가하기</AddMemberButton>
    </MemberListWrap>
  );
};

const MemberListWrap = styled.section`
  padding: 0 20px;
  border-bottom: 1px solid ${(props) => props.theme.colors.grey[2]};
`;
const MemberListHeader = styled.h3`
  padding: 12px 0;
  ${(props) => props.theme.textStyles.h3}
`;
const AddMemberButton = styled(Button)`
  width: 100%;
  height: auto;
  margin: 20px 0;
  padding: 16px 0;
  ${(props) => props.theme.textStyles.buttonSmall}
  color: ${(props) => props.theme.colors.grey[1]};
  background-color: ${(props) => props.theme.colors.grey[10]};
`;
