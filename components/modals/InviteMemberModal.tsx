import { Box, Button, Heading, ModalBody } from '@chakra-ui/react';
import BaseModal from '@/components/modals/BaseModal';
import { HOSTING_URL } from '@/utils/const';
import { useFetchInvitations } from '@/hooks/invitation/useFetchInvitations';
import { useUser } from '@/store/useUser';
import styled from '@emotion/styled';
import { addDays } from '@/utils/date';
import { useFetchGroup } from '@/hooks/group/useFetchGroup';
import queryString from 'query-string';
import theme from '@/styles/theme';
import { LoginInvitationIcon } from '../icons';
import useCustomToast from '@/hooks/shared/useCustomToast';

interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalContent = () => {
  const { openToast } = useCustomToast();
  const { user, selectedGroupId } = useUser();
  const { data: group } = useFetchGroup(selectedGroupId);
  const { data: invitations, isLoading } = useFetchInvitations(user?.id, selectedGroupId);
  const invitation = invitations?.[0];
  const invitationUrl = invitation
    ? queryString.stringifyUrl({ url: HOSTING_URL, query: { code: invitation.code } })
    : null;

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
      openToast({ message: '초대 링크가 클립보드에 복사되었습니다.', type: 'success' });
    }
  };

  return (
    <ModalBody textAlign={'center'}>
      <ShareInvitationTitle>
        <b>{group?.name}</b>의 <br />
        새로운 멤버를 초대해보세요
      </ShareInvitationTitle>

      <Box display={'inline-block'}>
        <LoginInvitationIcon />
      </Box>

      <ShareInvitationButton disabled={isLoading || !invitation} onClick={shareInvitation}>
        초대 링크 공유하기
      </ShareInvitationButton>
      {invitationExpiredAt && (
        <ShareExpiredAtText>유효 시점: {invitationExpiredAt.toLocaleString()}까지</ShareExpiredAtText>
      )}
    </ModalBody>
  );
};

const InviteMemberModal = ({ isOpen, onClose }: InviteMemberModalProps) => (
  <BaseModal isOpen={isOpen} onClose={onClose} modalContent={<ModalContent />} width={300} height={368} />
);

export default InviteMemberModal;

const ShareInvitationTitle = styled(Heading)`
  margin: 20px 0 30px;
  font-weight: 400;
  font-size: 18px;
  line-height: 27px;
  text-align: center;
  letter-spacing: -0.01em;
  color: ${theme.colors.grey[10]};
`;
const ShareInvitationButton = styled(Button)`
  width: 100%;
  height: auto;
  margin: 24px 0 8px;
  padding: 16px 0;
  ${theme.textStyles.buttonSmall};
  color: ${theme.colors.grey[1]};
  background-color: ${theme.colors.grey[10]};
`;
const ShareExpiredAtText = styled.p`
  ${theme.textStyles.caption};
  color: ${theme.colors.grey[4]};
`;
