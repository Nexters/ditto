import React, { memo } from 'react';
import { useFetchBucketFolders } from '@/hooks/bucketlist/useFetchBucketFolders';
import styled from '@emotion/styled';
import { BucketFolder } from '@/lib/supabase/type';
import { useDisclosure } from '@chakra-ui/react';
import AddBucketFolderModal from '@/components/modals/bucketList/AddBucketFolderModal';
import BucketFolderItem from '@/components/bucketFolder/BucketFolderItem';
import PartialLoader from '@/components/loading/PartialLoader';
import theme from '@/styles/theme';
import { PlusWhiteIcon } from '@/components/icons';

const MAX_LIST_LENGTH = 10;

const BucketFolderList = () => {
  const { data = [], isLoading, isError } = useFetchBucketFolders();
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (isError) return <div>에러 발생</div>;
  if (isLoading) return <PartialLoader />;

  const emptyDataLength = MAX_LIST_LENGTH - data?.length;

  return (
    <StyledList>
      {data?.slice(0, MAX_LIST_LENGTH).map((folder: BucketFolder) => (
        <BucketFolderItem folder={folder} key={folder.id} />
      ))}
      {emptyDataLength > 0 &&
        Array.from({ length: emptyDataLength }).map((_, index) => (
          <li key={index}>
            <AddFolderButton onClick={onOpen}>
              <PlusWhiteIcon strokeColor={theme.colors.grey[4]} width={24} height={24} />
            </AddFolderButton>
          </li>
        ))}
      <AddBucketFolderModal isOpen={isOpen} onClose={onClose} />
    </StyledList>
  );
};

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px 20px;
`;

const AddFolderButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.grey[2]};
  border-radius: 12px;
  height: 70px;
`;

export default memo(BucketFolderList);
