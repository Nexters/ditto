import React, { ReactNode } from 'react';
import { Modal, ModalOverlay, ModalContent } from '@chakra-ui/react';

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalContent: ReactNode;
}

const BaseModal = (props: BaseModalProps) => {
  const { isOpen, onClose, modalContent } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg="blackAlpha.100" />
      <ModalContent bgColor="white" width={300} height={200}>
        {modalContent}
      </ModalContent>
    </Modal>
  );
};

export default BaseModal;
