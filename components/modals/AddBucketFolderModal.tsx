import React from 'react';
import { ModalFooter, ModalBody } from '@chakra-ui/react';
import BaseModal from '@/components/modals/BaseModal';
import ContentTextarea from '@/components/inputs/ContentTextarea';
import BaseButton from '@/components/buttons/BaseButton';

interface AddBucketFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalContent = () => {
  const [folderName, setFolderName] = React.useState('');
  return (
    <>
      <ModalBody>
        <ContentTextarea
          placeholder={'폴더명을 입력하세요'}
          value={folderName}
          onChange={(e) => {
            setFolderName(e.target.value);
          }}
        />
      </ModalBody>
      <ModalFooter>
        <BaseButton label={'추가'} />
      </ModalFooter>
    </>
  );
};

const AddBucketFolderModal = ({ isOpen, onClose }: AddBucketFolderModalProps) => (
  <BaseModal isOpen={isOpen} onClose={onClose} modalContent={<ModalContent />} />
);
export default AddBucketFolderModal;
