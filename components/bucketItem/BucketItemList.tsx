import React from 'react';
import { useRouter } from 'next/router';
import { useFetchBucketItems } from '@/hooks/useFetchBucketItems';
import BucketItem from '@/components/bucketItem/BucketItem';
import { Button, Input, InputGroup, InputRightAddon, InputRightElement } from '@chakra-ui/react';

const BucketItemList = () => {
  const router = useRouter();
  const { folderId } = router.query;

  const { data, status } = useFetchBucketItems(Number(folderId));

  if (status === 'loading') return <div>로딩중</div>;
  if (status === 'error') return <div>에러 발생</div>;

  console.log(data);

  const handleClick = () => {
    console.log('click');
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
