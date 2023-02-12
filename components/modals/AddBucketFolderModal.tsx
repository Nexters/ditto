import React from 'react';
import { FormControl, FormLabel, Input, ModalFooter, ModalBody } from '@chakra-ui/react';
import BaseModal from '@/components/modals/BaseModal';

interface AddBucketFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalContent = () => {
  return (
    <>
      <ModalBody>
        <FormControl>
          <FormLabel>폴더 이름</FormLabel>
          <Input placeholder="폴더명을 입력하세요." />
        </FormControl>
      </ModalBody>
      <ModalFooter>test</ModalFooter>
    </>
  );
};

const AddBucketFolderModal = ({ isOpen, onClose }: AddBucketFolderModalProps) => (
  <BaseModal isOpen={isOpen} onClose={onClose} modalContent={<ModalContent />} />
);
export default AddBucketFolderModal;
