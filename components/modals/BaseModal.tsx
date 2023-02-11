import React, { ReactNode } from 'react';
import { Modal, ModalOverlay, ModalContent } from '@chakra-ui/react';

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalContent: ReactNode;
  height?: number;
  width?: number;
}

const BaseModal = (props: BaseModalProps) => {
  const { isOpen, onClose, modalContent, width, height } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg="blackAlpha.300" />
      <ModalContent style={ModalStyle} width={width ? width : 300} height={height ? height : 230}>
        {modalContent}
      </ModalContent>
    </Modal>
  );
};

const ModalStyle = {
  backgroundColor: 'white',
  boxShadow: 'none',
  marginTop: 138,
};

export default BaseModal;
