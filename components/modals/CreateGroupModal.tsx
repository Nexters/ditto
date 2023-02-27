import { Button, ModalBody, ModalFooter } from '@chakra-ui/react';
import BaseModal from '@/components/modals/BaseModal';
import styled from '@emotion/styled';
import ContentTextarea from '../inputs/ContentTextarea';
import { useState } from 'react';
import { useUser } from '@/store/useUser';
import useCustomToast from '@/hooks/shared/useCustomToast';
import { useMutateCreateGroup } from '@/hooks/group/useMutateCreateGroup';

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalContent = ({ onClose }: Pick<CreateGroupModalProps, 'onClose'>) => {
  const { user, setGroupId } = useUser();
  const { openToast } = useCustomToast();
  const { mutateAsync } = useMutateCreateGroup();

  const [groupName, setGroupName] = useState('');

  const disabledToCreate = groupName.trim().length === 0;

  const handleClickCreateButton = async () => {
    if (!user) return;

    try {
      const group = await mutateAsync({ userId: user.id, groupName });
      setGroupId(group.id);
      onClose();
    } catch (error) {
      console.error(error);
      openToast({ message: '그룹 만들기에 실패했습니다.', type: 'error' });
    }
  };

  return (
    <ModalBody>
      <CreateGroupModalTitle>새 그룹 만들기</CreateGroupModalTitle>
      <ContentTextarea
        placeholder="그룹 이름을 입력해주세요."
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />
      <ModalFooter>
        <CreateGroupModalButton disabled={disabledToCreate} onClick={handleClickCreateButton}>
          생성하기
        </CreateGroupModalButton>
      </ModalFooter>
    </ModalBody>
  );
};

const CreateGroupModal = ({ isOpen, onClose }: CreateGroupModalProps) => (
  <BaseModal isOpen={isOpen} onClose={onClose} modalContent={<ModalContent onClose={onClose} />} />
);

export default CreateGroupModal;

const CreateGroupModalTitle = styled.h1``;
const CreateGroupModalButton = styled(Button)``;
