import React, { ReactNode } from 'react';
import { Modal, ModalOverlay, ModalContent } from '@chakra-ui/react';
import styled from '@emotion/styled';

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
      <StyledModalContent width={width ? width : 300} height={height ? height : 230}>
        {modalContent}
      </StyledModalContent>
    </Modal>
  );
};

const StyledModalContent = styled(ModalContent)`
  background-color: white;
  box-shadow: none;
  margin-top: 138px;
`;

export default BaseModal;
