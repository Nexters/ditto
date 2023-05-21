import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import React from 'react';
import { useMutateBucketItems } from '@/hooks/bucketlist/useMutateBucketItems';
import styled from '@emotion/styled';
import theme from '@/styles/theme';
import { MAX_LENGTH__BUCKETLIST_ITEM_TITLE } from '@/utils/const';
import { useSendNotification } from '@/hooks/useSendNotification';
import { useUser } from '@/store/useUser';
import { useFetchGroup } from '@/hooks/group/useFetchGroup';

const BucketItemInput = ({ folderId }: { folderId: number }) => {
  const { user, selectedGroupId } = useUser();
  const { data: group } = useFetchGroup(selectedGroupId);

  const { createBucketItemMutation } = useMutateBucketItems();
  const { mutate: createBucket } = createBucketItemMutation;
  const { mutate: sendNotification } = useSendNotification();

  const [itemTitle, setItemTitle] = React.useState<string>('');

  const handleChangeTitle = (nextTitle: string) => {
    setItemTitle(nextTitle.slice(0, MAX_LENGTH__BUCKETLIST_ITEM_TITLE));
  };

  const handleClick = () => {
    if (!user || !selectedGroupId || !group) return;
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

    sendNotification({
      sender_id: user.id,
      group_id: selectedGroupId,
      notification_title: group.name,
      notification_body: `${user.nickname}님이 새로운 버킷리스트를 추가했습니다.`,
    });
  };

  return (
    <InputGroup size="lg" marginTop={'12px'}>
      <StyledInput
        placeholder="이 곳에 입력해보세요."
        maxLength={MAX_LENGTH__BUCKETLIST_ITEM_TITLE}
        value={itemTitle}
        onChange={(e) => handleChangeTitle(e.target.value)}
        focusBorderColor={'primary'}
      />
      <InputRightElement width="4.5rem">
        <AddButton size="sm" onClick={handleClick}>
          추가
        </AddButton>
      </InputRightElement>
    </InputGroup>
  );
};

const StyledInput = styled(Input)`
  box-shadow: 0px 0px 15px rgba(245, 105, 60, 0.18);
  border: 2px solid ${theme.colors.primary};
  border-radius: 12px;
  height: 56px;
  &:hover {
    border: 2px solid ${theme.colors.primary};
  }
`;

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
