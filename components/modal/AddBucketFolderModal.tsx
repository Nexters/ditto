import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  FormControl,
  FormLabel,
  Input,
  Button,
  ModalFooter,
  ModalBody,
} from '@chakra-ui/react';

interface AddBucketFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const handleClickAdd = () => {
  console.log('add');
};

const AddBucketFolderModal = (props: AddBucketFolderModalProps) => (
  <Modal {...props}>
    <ModalOverlay />
    <ModalContent bgColor="white" width={300} height={200}>
      <ModalBody>
        <FormControl>
          <FormLabel>폴더 이름</FormLabel>
          <Input placeholder="폴더명을 입력하세요." />
        </FormControl>
      </ModalBody>
      <ModalFooter>test</ModalFooter>
    </ModalContent>
  </Modal>
);

export default AddBucketFolderModal;
