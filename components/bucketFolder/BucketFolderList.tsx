import React from 'react';
import { useFetchBucketFolders } from '@/hooks/bucketlist/useFetchBucketFolders';
import styled from '@emotion/styled';
import { BucketFolder } from '@/lib/supabase/type';
import { Button, useDisclosure } from '@chakra-ui/react';
import AddBucketFolderModal from '@/components/modals/AddBucketFolderModal';
import BucketFolderItem from '@/components/bucketFolder/BucketFolderItem';

const MAX_LIST_LENGTH = 10;

const BucketFolderList = () => {
  const { data, status } = useFetchBucketFolders();
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (status === 'loading') return <div>로딩중</div>;
  if (status === 'error') return <div>에러 발생</div>;

  const emptyDataLength = MAX_LIST_LENGTH - data?.length;

  return (
    <StyledList>
      {data?.slice(0, MAX_LIST_LENGTH).map((folder: BucketFolder) => (
        <BucketFolderItem folder={folder} key={folder.id} />
      ))}
      {emptyDataLength > 0 &&
        Array.from({ length: emptyDataLength }).map((_, index) => (
          <li key={index}>
            <AddFolderButton onClick={onOpen}>+</AddFolderButton>
          </li>
        ))}
      <AddBucketFolderModal isOpen={isOpen} onClose={onClose} />
    </StyledList>
  );
};

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 10px;
  padding: 16px 20px;
`;

const AddFolderButton = styled(Button)`
  width: 100%;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.grey[2]};
  border-radius: 12px;
  height: 70px;
`;

export default BucketFolderList;
