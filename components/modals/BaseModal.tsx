import React, { ReactNode } from 'react';
import { Modal, ModalOverlay, ModalContent } from '@chakra-ui/react';

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalContent: ReactNode;
  width?: number;
  height?: number;
}

const BaseModal = (props: BaseModalProps) => {
  const { isOpen, onClose, modalContent, width, height } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg="blackAlpha.700" />
      <ModalContent bgColor="white" boxShadow="none" marginTop={138} width={width || 300} height={height || 230}>
        {modalContent}
      </ModalContent>
    </Modal>
  );
};

export default BaseModal;
