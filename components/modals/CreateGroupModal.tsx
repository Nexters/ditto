import { Button, Flex, ModalBody } from '@chakra-ui/react';
import BaseModal from '@/components/modals/BaseModal';
import styled from '@emotion/styled';
import ContentTextarea from '../inputs/ContentTextarea';
import { useState } from 'react';
import { useUser } from '@/store/useUser';
import useCustomToast from '@/hooks/shared/useCustomToast';
import { useMutateCreateGroup } from '@/hooks/group/useMutateCreateGroup';
import theme from '@/styles/theme';
import { useRouter } from 'next/router';
import { MAX_LENGTH__GROUP_NAME } from '@/utils/const';

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalContent = ({ onClose }: Pick<CreateGroupModalProps, 'onClose'>) => {
  const { user, setGroupId } = useUser();
  const { openToast } = useCustomToast();
  const { mutate, isLoading } = useMutateCreateGroup();
  const router = useRouter();

  const [groupName, setGroupName] = useState('');

  const disabledToCreate = groupName.trim().length === 0 || isLoading;

  const handleChangeTitle = (input: string) => {
    setGroupName(input.slice(0, MAX_LENGTH__GROUP_NAME));
  };
  const handleClickCreateButton = () => {
    if (!user) return;
    if (disabledToCreate) return;

    mutate(
      { userId: user.id, groupName },
      {
        onSuccess: (group) => {
          setGroupId(group.id);
          openToast({ message: '새 그룹이 생성되었습니다.', type: 'success' });
          router.replace('/bucketlist');
          onClose();
        },
        onError: (error) => {
          console.error(error);
          openToast({ message: '그룹 만들기에 실패했습니다.', type: 'error' });
        },
      }
    );
  };

  return (
    <ModalBody>
      <CreateGroupModalTitle>새 그룹 만들기</CreateGroupModalTitle>
      <ContentTextarea
        placeholder="그룹명을 입력하세요"
        value={groupName}
        maxLength={MAX_LENGTH__GROUP_NAME}
        onChange={(e) => handleChangeTitle(e.target.value)}
      />

      <Flex padding={'34px 0 8px'} justifyContent={'flex-end'}>
        <CreateGroupModalButton isDisabled={disabledToCreate} onClick={handleClickCreateButton}>
          생성하기
        </CreateGroupModalButton>
      </Flex>
    </ModalBody>
  );
};

const CreateGroupModal = ({ isOpen, onClose }: CreateGroupModalProps) => (
  <BaseModal isOpen={isOpen} onClose={onClose} modalContent={<ModalContent onClose={onClose} />} />
);

export default CreateGroupModal;

const CreateGroupModalTitle = styled.h1`
  margin: 8px 0 12px;

  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.01em;
  color: ${theme.colors.primary};
`;
const CreateGroupModalButton = styled(Button)`
  width: 80px;
  height: 38px;
  padding: 12px 16px;
  background: ${theme.colors.grey[10]};
  border-radius: 6px;
  ${theme.textStyles.buttonSmall};
  color: ${theme.colors.grey[1]};
`;
