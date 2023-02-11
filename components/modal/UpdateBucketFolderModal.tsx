import React from 'react';
import { Text } from '@chakra-ui/react';
import BaseModal from '@/components/modal/BaseModal';

interface UpdateBucketModalProps {
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

const UpdateBucketFolderModal = ({ isOpen, onClose }: UpdateBucketModalProps) => (
  <BaseModal isOpen={isOpen} onClose={onClose} modalContent={<ModalContent />} />
);

export default UpdateBucketFolderModal;
