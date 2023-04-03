import React, { memo } from 'react';
import { useRouter } from 'next/router';
import { useFetchBucketItems } from '@/hooks/bucketlist/useFetchBucketItems';
import BucketItem from '@/components/bucketItem/BucketItem';
import styled from '@emotion/styled';
import PartialLoader from '@/components/loading/PartialLoader';
import EmptyItem from '@/components/bucketItem/EmptyItem';
import BucketItemInput from '@/components/bucketItem/BucketItemInput';

const BucketItemList = () => {
  const router = useRouter();
  const { folderId } = router.query;

  const { data: bucketItems = [], isLoading } = useFetchBucketItems(Number(folderId));

  return (
    <>
      <BucketItemInput folderId={Number(folderId ?? '')} />
      <ListWrapper>
        {isLoading ? (
          <PartialLoader />
        ) : (
          <>
            {bucketItems?.length === 0 && <EmptyItem />}
            {bucketItems?.map((item) => (
              <BucketItem key={item.id} item={item} />
            ))}
          </>
        )}
      </ListWrapper>
    </>
  );
};

const ListWrapper = styled.ul`
  min-height: calc(100vh - 435px);
`;

export default memo(BucketItemList);
