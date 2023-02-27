import { useFetchMemberList } from '@/hooks/member/useFetchMemberList';
import { useUser } from '@/store/useUser';
import theme from '@/styles/theme';
import { Button } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/react';
import styled from '@emotion/styled';
import InviteMemberModal from '../modals/InviteMemberModal';
import { MemberItem } from './MemberItem';

export const MemberList = () => {
  const { user, selectedGroupId } = useUser();
  const { data } = useFetchMemberList(user, selectedGroupId);
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!user) return null;
  return (
    <>
      <MemberListWrap>
        <MemberListHeader>멤버 리스트</MemberListHeader>
        <MemberItem key={user.id} nickname={user.nickname} profileImage={user.profile_image} isMe />
        {data?.map((member) => (
          <MemberItem key={member.id} nickname={member.nickname} profileImage={member.profile_image} />
        ))}
        <InviteMemberButton onClick={onOpen}>멤버 초대하기</InviteMemberButton>
      </MemberListWrap>

      <InviteMemberModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

const MemberListWrap = styled.section`
  padding: 0 20px;
  border-bottom: 1px solid ${theme.colors.grey[2]};
`;
const MemberListHeader = styled.h3`
  padding: 12px 0;
  ${theme.textStyles.h3};
`;
const InviteMemberButton = styled(Button)`
  width: 100%;
  height: auto;
  margin: 20px 0;
  padding: 16px 0;
  ${theme.textStyles.buttonSmall};
  color: ${theme.colors.grey[1]};
  background-color: ${theme.colors.grey[10]};
`;
