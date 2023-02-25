import { Button, ModalBody } from '@chakra-ui/react';
import BaseModal from '@/components/modals/BaseModal';
import { HOSTING_URL } from '@/utils/const';
import { useFetchInvitations } from '@/hooks/invitation/useFetchInvitations';
import { useUser } from '@/store/useUser';
import styled from '@emotion/styled';
import { addDays } from '@/utils/date';
import { useFetchGroup } from '@/hooks/group/useFetchGroup';

interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalContent = () => {
  const { user, selectedGroupId } = useUser();
  const { data: group } = useFetchGroup(selectedGroupId);
  const { data: invitations, isLoading } = useFetchInvitations(user?.id, selectedGroupId);
  const invitation = invitations?.[0];
  const invitationUrl = invitation ? `${HOSTING_URL}?code=${invitation.code}` : null;

  // @fixme: 생성일 하루 뒤에 만료됨. 이 부분은 별도 함수 혹은 적어도 상수로 관리할 필요 있음.
  const invitationExpiredAt = invitation ? addDays(invitation.created_time, 1) : null;

  const shareInvitation = () => {
    const text = `👋${group?.name}에서 ${user?.nickname}님과 함께 일정과 버킷리스트를 편하게 공유해보세요.\n\n${invitationUrl}`;
    try {
      navigator.share({ text });
    } catch (error) {
      // @note: https://caniuse.com/mdn-api_clipboard_writetext
      // 왠만하면 되는 듯
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <ModalBody>
      <ShareInvitationTitle>초대 링크</ShareInvitationTitle>
      <ShareInvitationButton disabled={isLoading || !invitation} onClick={shareInvitation}>
        초대 링크 공유하기
      </ShareInvitationButton>
      {invitationExpiredAt && (
        <ShareExpiredAtText>{invitationExpiredAt.toLocaleString()}까지 사용 가능</ShareExpiredAtText>
      )}
    </ModalBody>
  );
};

const InviteMemberModal = ({ isOpen, onClose }: InviteMemberModalProps) => (
  <BaseModal isOpen={isOpen} onClose={onClose} modalContent={<ModalContent />} />
);

export default InviteMemberModal;

const ShareInvitationTitle = styled.h1``;
const ShareInvitationButton = styled(Button)``;
const ShareExpiredAtText = styled.p``;
