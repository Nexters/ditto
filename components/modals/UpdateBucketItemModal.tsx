import React from 'react';
import { Box, Divider, ModalBody, ModalHeader, Text } from '@chakra-ui/react';
import BaseModal from '@/components/modals/BaseModal';
import TitleInput from '@/components/inputs/TitleInput';
import theme from '@/styles/theme';
import ContentInput from '@/components/inputs/ContentInput';

interface UpdateBucketItemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalContent = () => {
  return (
    <>
      <ModalHeader style={modalHeaderStyle}>
        <Text textAlign={'center'} textStyle={'body1'} style={headerTextStyle}>
          Modal header
        </Text>
      </ModalHeader>
      <ModalBody padding={0}>
        <TitleInput placeholder={'제목을 입력하세요'} height={94} />
        <Divider borderWidth={4} borderColor={'divider'} />
        <Box padding={'20px'}>
          <ContentInput placeholder={'설명을 입력하세요'} height={94} />
        </Box>
      </ModalBody>
    </>
  );
};

const UpdateBucketItemModal = ({ isOpen, onClose }: UpdateBucketItemModalProps) => (
  <BaseModal isOpen={isOpen} onClose={onClose} modalContent={<ModalContent />} width={335} height={384} />
);

const modalHeaderStyle = {
  background: `${theme.colors.grey[8]}`,
  borderRadius: '12px 12px 0px 0px',
  color: `${theme.colors.grey[1]}`,
  height: 56,
};

const headerTextStyle = {
  paddingTop: 4,
  paddingBottom: 4,
};

export default UpdateBucketItemModal;
