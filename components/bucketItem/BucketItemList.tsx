import React, { memo, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useFetchBucketItems } from '@/hooks/bucketlist/useFetchBucketItems';
import BucketItem from '@/components/bucketItem/BucketItem';
import styled from '@emotion/styled';
import PartialLoader from '@/components/loading/PartialLoader';
import EmptyItem from '@/components/bucketItem/EmptyItem';
import BucketItemInput from '@/components/bucketItem/BucketItemInput';
import { useUnreadBucketItems } from '@/hooks/bucketlist/useUnreadBucketItems';

const BucketItemList = () => {
  const router = useRouter();
  const folderId = Number(router.query.folderId ?? '');

  const { setReadByFolderId } = useUnreadBucketItems();
  const { data: bucketItems = [], isLoading } = useFetchBucketItems(folderId);

  useEffect(() => {
    // @note: 이 페이지로 넘어오면 각 아이템들을 읽음 처리한다
    const handleRouteChange = () => folderId && setReadByFolderId(folderId);
    router.events.on('routeChangeStart', handleRouteChange);
    return () => router.events.off('routeChangeStart', handleRouteChange);
  }, [folderId, router.events, setReadByFolderId]);

  return (
    <>
      <BucketItemInput folderId={folderId} />
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
