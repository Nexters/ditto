import React from 'react';
import { ModalFooter, ModalBody } from '@chakra-ui/react';
import BaseModal from '@/components/modals/BaseModal';
import ContentInput from '@/components/inputs/ContentInput';
import BaseButton from '@/components/buttons/BaseButton';

interface AddBucketFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalContent = () => {
  return (
    <>
      <ModalBody>
        <ContentInput placeholder={'폴더명을 입력하세요'} />
      </ModalBody>
      <ModalFooter>
        <BaseButton />
      </ModalFooter>
    </>
  );
};

const AddBucketFolderModal = ({ isOpen, onClose }: AddBucketFolderModalProps) => (
  <BaseModal isOpen={isOpen} onClose={onClose} modalContent={<ModalContent />} />
);
export default AddBucketFolderModal;
