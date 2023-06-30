import { ModalBody } from '@chakra-ui/react';
import BaseModal from '@/components/modals/BaseModal';
import styled from '@emotion/styled';
import theme from '@/styles/theme';
import { Switch } from '../common/switch';
import { useUser } from '@/store/useUser';
import useCustomToast from '@/hooks/shared/useCustomToast';

interface AlarmSettingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalContent = () => {
  const { user, setAllowedAlarm } = useUser();
  const { openToast } = useCustomToast();

  const toggleSwitch = async () => {
    if (!user) return;

    if (user.is_allowed_alarm !== true && 'Notification' in window) {
      try {
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') throw 'no permission';
      } catch (error) {
        console.error(error);
        return openToast({ message: '앱의 알림 권한을 허용해주세요.', type: 'error' });
      }
    }

    try {
      await setAllowedAlarm(!user.is_allowed_alarm);
      openToast({ message: '설정이 변경되었습니다.', type: 'success' });
    } catch (error) {
      console.error(error);
      openToast({ message: '변경에 실패했습니다.', type: 'error' });
    }
  };

  return (
    <ModalBody>
      <AlarmSettingModalTitle>
        <span>알림 설정</span>
        <Switch isChecked={user?.is_allowed_alarm ?? false} onChange={toggleSwitch} />
      </AlarmSettingModalTitle>

      <AlarmSettingModalDescription>
        새로운 일정/버킷리스트가 추가된 경우 알림을 받을 수 있어요.
      </AlarmSettingModalDescription>
    </ModalBody>
  );
};

const AlarmSettingModal = ({ isOpen, onClose }: AlarmSettingModalProps) => (
  <BaseModal isOpen={isOpen} onClose={onClose} height={120} modalContent={<ModalContent />} />
);

export default AlarmSettingModal;

const AlarmSettingModalTitle = styled.h1`
  padding: 8px 0 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${theme.textStyles.buttonMedium};
  color: ${theme.colors.grey[10]};
`;
const AlarmSettingModalDescription = styled.p`
  ${theme.textStyles.multiBody3};
  color: ${theme.colors.grey[5]};
`;
