import React from 'react';
import { Modal, ModalOverlay, ModalContent, Text, FormControl, FormLabel, Input } from '@chakra-ui/react';

interface AddBucketFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddBucketFolderModal = (props: AddBucketFolderModalProps) => (
  <Modal {...props}>
    <ModalOverlay />
    <ModalContent bgColor="white" width={300} height={400}>
      <FormControl>
        <FormLabel>폴더 이름</FormLabel>
        <Input placeholder="폴더명을 입력하세요." />
      </FormControl>
    </ModalContent>
  </Modal>
);

export default AddBucketFolderModal;
