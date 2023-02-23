import React, { memo } from 'react';
import { useRouter } from 'next/router';
import { useFetchBucketItems } from '@/hooks/bucketlist/useFetchBucketItems';
import BucketItem from '@/components/bucketItem/BucketItem';
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useMutateBucketItems } from '@/hooks/bucketlist/useMutateBucketItems';
import styled from '@emotion/styled';
import PartialLoader from '@/components/loading/PartialLoader';

const BucketItemList = () => {
  const router = useRouter();
  const { folderId } = router.query;

  const { data = [], isLoading } = useFetchBucketItems(Number(folderId));
  const { createBucketItemMutation } = useMutateBucketItems();
  const { mutate: createBucket } = createBucketItemMutation;

  const [itemTitle, setItemTitle] = React.useState<string>('');

  const handleClick = () => {
    if (!itemTitle) return;

    createBucket({
      bucket_folder_id: Number(folderId),
      description: '',
      completed: false,
      title: itemTitle,
    });
  };

  return (
    <>
      <InputGroup size="lg">
        <Input placeholder="이 곳에 입력해보세요." value={itemTitle} onChange={(e) => setItemTitle(e.target.value)} />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            추가
          </Button>
        </InputRightElement>
      </InputGroup>
      <ListWrapper>
        {isLoading ? (
          <PartialLoader />
        ) : (
          <>
            {data?.length === 0 && <div>아직 아이템이 없습니다.</div>}
            {data?.map((item) => (
              <BucketItem key={item.id} item={item} />
            ))}
          </>
        )}
      </ListWrapper>
    </>
  );
};

const ListWrapper = styled.ul`
  min-height: calc(100vh - 430px);
`;

export default memo(BucketItemList);
