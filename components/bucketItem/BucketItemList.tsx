import React from 'react';
import { useRouter } from 'next/router';
import { useFetchBucketItems } from '@/hooks/bucketlist/useFetchBucketItems';
import BucketItem from '@/components/bucketItem/BucketItem';
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useMutateBucketItems } from '@/hooks/bucketlist/useMutateBucketItems';

const BucketItemList = () => {
  const router = useRouter();
  const { folderId } = router.query;

  const { data, status } = useFetchBucketItems(Number(folderId));
  const { createBucketItemMutation } = useMutateBucketItems();
  const { mutate: createBucket } = createBucketItemMutation;

  if (status === 'loading') return <div>로딩중</div>;
  if (status === 'error') return <div>에러 발생</div>;

  const handleClick = () => {
    createBucket({
      bucket_folder_id: Number(folderId),
      description: 'test4',
      completed: false,
      title: 'test4',
    });
  };

  return (
    <>
      <InputGroup size="lg">
        <Input placeholder="이 곳에 입력해보세요." />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            추가
          </Button>
        </InputRightElement>
      </InputGroup>
      <ul>
        {data?.map((item) => (
          <BucketItem key={item.id} item={item} />
        ))}
      </ul>
    </>
  );
};

export default BucketItemList;
