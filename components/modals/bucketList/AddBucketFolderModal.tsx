import React from 'react';
import { ModalFooter, ModalBody } from '@chakra-ui/react';
import BaseModal from '@/components/modals/BaseModal';
import ContentTextarea from '@/components/inputs/ContentTextarea';
import BaseButton from '@/components/buttons/BaseButton';
import { useMutateBucketFolders } from '@/hooks/bucketlist/useMutateBucketFolders';
import FolderLabel from '@/components/modals/bucketList/FolderLabel';
import { MAX_LENGTH__BUCKETLIST_FOLDER_NAME } from '@/utils/const';

interface AddBucketFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddBucketFolderModal = ({ isOpen, onClose }: AddBucketFolderModalProps) => {
  const ModalContent = () => {
    const [folderName, setFolderName] = React.useState('');

    const { createBucketFolderMutation } = useMutateBucketFolders();
    const { mutate: createBucketFolder } = createBucketFolderMutation;

    const handleChangeTitle = (input: string) => {
      setFolderName(input.slice(0, MAX_LENGTH__BUCKETLIST_FOLDER_NAME));
    };
    const handleClickAddButton = () => {
      createBucketFolder(
        {
          title: folderName,
        },
        {
          onSuccess: () => {
            setFolderName('');
            onClose();
          },
        }
      );
    };

    return (
      <>
        <ModalBody>
          <FolderLabel />
          <ContentTextarea
            placeholder={'폴더명을 입력하세요'}
            value={folderName}
            maxLength={MAX_LENGTH__BUCKETLIST_FOLDER_NAME}
            onChange={(e) => handleChangeTitle(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <BaseButton isDisabled={!folderName.length} onClick={handleClickAddButton}>
            저장하기
          </BaseButton>
        </ModalFooter>
      </>
    );
  };

  return <BaseModal isOpen={isOpen} onClose={onClose} modalContent={<ModalContent />} />;
};
export default AddBucketFolderModal;
