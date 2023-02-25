import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import React from 'react';
import { useMutateBucketItems } from '@/hooks/bucketlist/useMutateBucketItems';
import styled from '@emotion/styled';
import theme from '@/styles/theme';

const BucketItemInput = ({ folderId }: { folderId: number }) => {
  const { createBucketItemMutation } = useMutateBucketItems();
  const { mutate: createBucket } = createBucketItemMutation;

  const [itemTitle, setItemTitle] = React.useState<string>('');

  const handleClick = () => {
    if (!itemTitle) return;

    createBucket(
      {
        bucket_folder_id: folderId,
        description: '',
        completed: false,
        title: itemTitle,
      },
      {
        onSuccess: () => {
          setItemTitle('');
        },
      }
    );
  };

  return (
    <InputGroup size="lg" marginTop={'12px'}>
      <Input
        placeholder="이 곳에 입력해보세요."
        value={itemTitle}
        focusBorderColor={'primary'}
        onChange={(e) => setItemTitle(e.target.value)}
        borderRadius={'12px'}
        height={'56px'}
      />
      <InputRightElement width="4.5rem">
        <AddButton size="sm" onClick={handleClick}>
          추가
        </AddButton>
      </InputRightElement>
    </InputGroup>
  );
};

const AddButton = styled(Button)`
  background: transparent;
  color: ${theme.colors.primary};
  margin-top: 10px;
  font: ${theme.textStyles.buttonMedium};

  &:hover {
    background: transparent;
  }
`;

export default BucketItemInput;
