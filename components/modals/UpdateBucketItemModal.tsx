import React from 'react';
import { Box, Divider, ModalBody, ModalHeader, Text } from '@chakra-ui/react';
import BaseModal from '@/components/modals/BaseModal';
import TitleTextarea from '@/components/inputs/TitleTextarea';
import ContentTextarea from '@/components/inputs/ContentTextarea';
import styled from '@emotion/styled';

interface UpdateBucketItemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalContent = () => {
  const [itemTitle, setItemTitle] = React.useState('');
  const [itemContent, setItemContent] = React.useState('');

  return (
    <>
      <StyledModalHeader>
        <StyledModalHeaderText textStyle={'body1'}>Modal header</StyledModalHeaderText>
      </StyledModalHeader>
      <ModalBody padding={0}>
        <TitleTextarea
          placeholder={'제목을 입력하세요'}
          height={94}
          value={itemTitle}
          onChange={(e) => {
            setItemTitle(e.target.value);
          }}
        />
        <Divider borderWidth={4} borderColor={'divider'} />
        <Box padding={'20px'}>
          <ContentTextarea
            placeholder={'설명을 입력하세요'}
            height={94}
            value={itemContent}
            onChange={(e) => {
              setItemContent(e.target.value);
            }}
          />
        </Box>
      </ModalBody>
    </>
  );
};

const UpdateBucketItemModal = ({ isOpen, onClose }: UpdateBucketItemModalProps) => (
  <BaseModal isOpen={isOpen} onClose={onClose} modalContent={<ModalContent />} width={335} height={384} />
);

const StyledModalHeader = styled(ModalHeader)`
  background-color: ${({ theme }) => theme.colors.grey[8]};
  border-radius: 12px 12px 0px 0px;
  color: ${({ theme }) => theme.colors.grey[1]};
  height: 56px;
`;

const StyledModalHeaderText = styled(Text)`
  padding-top: 4px;
  padding-bottom: 4px;
  text-align: center;
`;

export default UpdateBucketItemModal;
