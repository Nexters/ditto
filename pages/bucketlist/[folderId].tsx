import React, { useEffect } from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import SimpleHeader, { SIMPLE_HEADER_HEIGHT } from '@/components/layouts/SimpleHeader';
import MainLayout from '@/components/layouts/MainLayout';
import BucketItemList from '@/components/bucketItem/BucketItemList';
import { Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useFetchBucketFolderById } from '@/hooks/bucketlist/useFetchBucketFolderById';
import styled from '@emotion/styled';
import ConditionalRabbitIcon from '@/components/bucketItem/ConditionalRabbitIcon';
import { useUser } from '@/store/useUser';

const BucketListItem: NextPageWithLayout = () => {
  const router = useRouter();
  const { selectedGroupId, setGroupId } = useUser();
  const { folderId } = router.query;
  const { data: bucketFolder } = useFetchBucketFolderById(Number(folderId));

  useEffect(() => {
    // @note: url로 바로 접근한 경우, 해당 폴더의 그룹 아이디를 selectedGroupId로 설정
    if (bucketFolder && bucketFolder.group_id !== selectedGroupId) {
      setGroupId(bucketFolder.group_id);
    }
  }, [bucketFolder, selectedGroupId, setGroupId]);

  return (
    <MainLayout header={<SimpleHeader />} headerHeight={SIMPLE_HEADER_HEIGHT}>
      <ListWrapper>
        <Text textStyle={'h1'} marginBottom={'12px'} minHeight={'105px'}>
          {bucketFolder?.title}
        </Text>
        <ConditionalRabbitIcon folderTitle={bucketFolder?.title ?? ''} />
        <BucketItemList />
      </ListWrapper>
    </MainLayout>
  );
};

BucketListItem.isProtectedPage = true;

const ListWrapper = styled.div`
  padding: 0 20px;
`;

export default BucketListItem;
