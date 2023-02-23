import React, { ChangeEvent } from 'react';
import { ModalFooter, ModalBody } from '@chakra-ui/react';
import BaseModal from '@/components/modals/BaseModal';
import ContentTextarea from '@/components/inputs/ContentTextarea';
import BaseButton from '@/components/buttons/BaseButton';
import { useMutateBucketFolders } from '@/hooks/bucketlist/useMutateBucketFolders';
import { TrashCanIcon } from '@/components/icons';

interface UpdateBucketFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: number;
  name: string;
}

const UpdateBucketFolderModal = ({ isOpen, onClose, name: initialName, id }: UpdateBucketFolderModalProps) => {
  const ModalContent = () => {
    const [folderName, setFolderName] = React.useState(initialName);

    const { updateBucketFolderMutation, deleteBucketFolderMutation } = useMutateBucketFolders();
    const { mutate: updateBucketFolder } = updateBucketFolderMutation;
    const { mutate: deleteBucketFolder } = deleteBucketFolderMutation;

    const handleClickEditButton = () => {
      updateBucketFolder(
        {
          title: folderName,
          id,
        },
        {
          onSuccess: () => {
            setFolderName('');
            onClose();
          },
        }
      );
    };

    const handleClickDeleteButton = () => {
      deleteBucketFolder(id, {
        onSuccess: () => {
          onClose();
        },
      });
    };

    return (
      <>
        <ModalBody>
          <ContentTextarea
            placeholder={'폴더명을 입력하세요'}
            value={folderName}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              setFolderName(e.target.value);
            }}
          />
        </ModalBody>
        <ModalFooter justifyContent={'space-between'}>
          <TrashCanIcon cursor="pointer" onClick={handleClickDeleteButton} />
          <BaseButton isDisabled={!folderName.length} onClick={handleClickEditButton}>
            저장하기
          </BaseButton>
        </ModalFooter>
      </>
    );
  };

  return <BaseModal isOpen={isOpen} onClose={onClose} modalContent={<ModalContent />} />;
};

export default UpdateBucketFolderModal;
