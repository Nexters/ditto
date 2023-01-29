import React from 'react';
import { Modal, ModalOverlay, ModalContent, Text } from '@chakra-ui/react';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * 일정 추가, 수정 모달
 */
const EventModal = (props: EventModalProps) => {
  return (
    <Modal {...props}>
      <ModalOverlay />
      <ModalContent bgColor="white" width={300} height={200}>
        <Text color="black" textAlign="center">
          hello world
        </Text>
      </ModalContent>
    </Modal>
  );
};

export default EventModal;
