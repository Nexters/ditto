import React from 'react';
import { Modal, ModalOverlay, ModalContent, Text } from '@chakra-ui/react';

interface UpdateBucketModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UpdateBucketFolderModal = (props: UpdateBucketModalProps) => (
  <Modal {...props}>
    <ModalOverlay />
    <ModalContent bgColor="white" width={300} height={400}>
      <Text color="black" textAlign="center">
        hello world
      </Text>
    </ModalContent>
  </Modal>
);

export default UpdateBucketFolderModal;
