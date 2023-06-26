import React, { useMemo } from 'react';
import { BucketFolder } from '@/lib/supabase/type';
import styled from '@emotion/styled';
import { Text, useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import UpdateBucketFolderModal from '@/components/modals/bucketList/UpdateBucketFolderModal';
import theme from '@/styles/theme';
import { useUnreadBucketItems } from '@/hooks/bucketlist/useUnreadBucketItems';
import { Badge } from '../common/badge';

const BucketFolderItem = ({ folder }: { folder: BucketFolder }) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: unreadBucketItems = [] } = useUnreadBucketItems();

  const unreadCount = useMemo(
    () =>
      unreadBucketItems.reduce((count, item) => {
        if (item.bucket_folder_id === folder.id) count += 1;
        return count;
      }, 0),
    [unreadBucketItems, folder.id]
  );

  const handleClickTitle = () => {
    router.push(`/bucketlist/${folder.id}`);
  };

  return (
    <>
      <BucketFolder key={folder.id}>
        <TitleSection onClick={handleClickTitle}>
          <Text textStyle={'h3'} mr={'6px'}>
            {folder.title}
          </Text>
          {unreadCount > 0 && <Badge square>{unreadCount}</Badge>}
        </TitleSection>
        <EditSection onClick={onOpen}>
          <Text textStyle={'body3'} color={'grey.4'}>
            편집
          </Text>
        </EditSection>
      </BucketFolder>
      <UpdateBucketFolderModal isOpen={isOpen} onClose={onClose} id={folder.id} name={folder.title} />
    </>
  );
};

const BucketFolder = styled.li`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 70px;
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.grey[2]};
  border-radius: 12px;
  align-items: center;
  padding: 0 20px;
  cursor: pointer;
`;

const TitleSection = styled.section`
  display: inherit;
  align-items: inherit;
  width: 80%;
  height: 100%;
`;

const EditSection = styled.section`
  width: 20%;
  height: 100%;
  display: inherit;
  align-items: center;
  justify-content: flex-end;
`;

export default BucketFolderItem;
