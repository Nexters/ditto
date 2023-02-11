import React from 'react';
import { Text } from '@chakra-ui/react';
import BaseModal from '@/components/modals/BaseModal';

interface UpdateBucketItemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalContent = () => {
  return (
    <Text color="black" textAlign="center">
      hello world
    </Text>
  );
};

const UpdateBucketItemModal = ({ isOpen, onClose }: UpdateBucketItemModalProps) => (
  <BaseModal isOpen={isOpen} onClose={onClose} modalContent={<ModalContent />} />
);

export default UpdateBucketItemModal;
