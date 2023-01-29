import React from 'react';
import { Modal, ModalOverlay, ModalContent, Text } from '@chakra-ui/react';

interface AddBucketFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddBucketFolderModal = (props: AddBucketFolderModalProps) => (
  <Modal {...props}>
    <ModalOverlay />
    <ModalContent bgColor="white" width={300} height={400}>
      <Text color="black" textAlign="center">
        hello world
      </Text>
    </ModalContent>
  </Modal>
);

export default AddBucketFolderModal;
