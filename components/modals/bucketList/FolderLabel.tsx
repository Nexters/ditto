import { FolderIcon } from '@/components/icons';
import { Text } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const FolderLabel = () => {
  return (
    <LabelWrapper>
      <FolderIcon width={20} height={20} />
      <Text textStyle={'multiBody2'} color={'primary'} fontWeight={600}>
        버킷리스트 폴더명
      </Text>
    </LabelWrapper>
  );
};

const LabelWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: 8px;
  margin-bottom: 12px;
`;

export default FolderLabel;
