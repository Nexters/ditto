import { ModalBody } from '@chakra-ui/react';
import BaseModal from '@/components/modals/BaseModal';
import styled from '@emotion/styled';
import { useUser } from '@/store/useUser';
import useCustomToast from '@/hooks/shared/useCustomToast';
import theme from '@/styles/theme';
import { Switch } from '../common/switch';
import { useFetchGroup } from '@/hooks/group/useFetchGroup';
import { useUpdateGroup } from '@/hooks/group/useUpdateGroup';

interface ShareEventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalContent = () => {
  const { selectedGroupId } = useUser();
  const { data: group } = useFetchGroup(selectedGroupId);
  const { mutate } = useUpdateGroup();
  const { openToast } = useCustomToast();
  const url = `${process.env.NEXT_PUBLIC_HOSTING_URL}api/event/${group?.uid}.ics`;

  const toggleSwitch = () => {
    if (!group) return;

    mutate(
      { groupId: group.id, isOpenedEvents: !group.is_opened_events },
      {
        onSuccess: () => {
          openToast({ message: '설정이 변경되었습니다.', type: 'success' });
        },
        onError: () => {
          openToast({ message: '변경에 실패했습니다.', type: 'error' });
        },
      }
    );
  };
  const copyLink = () => {
    if (!group) return;

    navigator.clipboard.writeText(url);
    openToast({ message: '공개링크가 복사되었습니다.', type: 'success' });
  };

  return (
    <ModalBody>
      <ShareEventModalTitle>
        <span>일정 공개</span>
        <Switch isDisabled={!group} isChecked={group?.is_opened_events} onChange={toggleSwitch} />
      </ShareEventModalTitle>

      <ShareEventModalDescription>
        일정을 공개하면 공개링크를 통해 외부(ex. 구글, 아웃룻 등)에서도 내 일정을 볼 수 있어요.
      </ShareEventModalDescription>

      <ShareEventModalButton disabled={!group?.is_opened_events} onClick={copyLink}>
        공개링크 복사하기
      </ShareEventModalButton>
    </ModalBody>
  );
};

const ShareEventModal = ({ isOpen, onClose }: ShareEventModalProps) => (
  <BaseModal isOpen={isOpen} onClose={onClose} height={164} modalContent={<ModalContent />} />
);

export default ShareEventModal;

const ShareEventModalTitle = styled.h1`
  padding: 8px 0 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${theme.textStyles.buttonMedium};
  color: ${theme.colors.grey[10]};
`;
const ShareEventModalDescription = styled.p`
  margin-bottom: 12px;
  ${theme.textStyles.multiBody3};
  color: ${theme.colors.grey[5]};
`;
const ShareEventModalButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 40px;
  padding: 6px 10px;
  border-radius: 6px;

  ${theme.textStyles.buttonSmall};
  background-color: ${theme.colors.orangeAlpha};
  border: 1px solid ${theme.colors.orange};
  color: ${theme.colors.orange};

  &:disabled {
    opacity: 0.5;
  }
`;
