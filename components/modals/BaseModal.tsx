import React, { ReactNode } from 'react';
import { Modal, ModalOverlay, ModalContent } from '@chakra-ui/react';

export interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalContent: ReactNode;
  width?: number;
  height?: number;
  closeOnOverlayClick?: boolean;
}

const BaseModal = (props: BaseModalProps) => {
  const { isOpen, onClose, modalContent, width, height, closeOnOverlayClick = true } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={closeOnOverlayClick}>
      <ModalOverlay bg="blackAlpha.700" />
      <ModalContent bgColor="white" boxShadow="none" marginTop={138} width={width || 300} height={height || 230}>
        {modalContent}
      </ModalContent>
    </Modal>
  );
};

export default BaseModal;
