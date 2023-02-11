import React from 'react';
import { useFetchBucketFolders } from '@/hooks/bucketlist/useFetchBucketFolders';
import styled from '@emotion/styled';
import { BucketFolder } from '@/lib/supabase/type';
import { Button, useDisclosure } from '@chakra-ui/react';
import AddBucketFolderModal from '@/components/modal/AddBucketFolderModal';
import BucketFolderItem from '@/components/bucketFolder/BucketFolderItem';

const MAX_LIST_LENGTH = 10;

const BucketFolderList = () => {
  const { data, status } = useFetchBucketFolders();
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (status === 'loading') return <div>로딩중</div>;
  if (status === 'error') return <div>에러 발생</div>;

  console.log(data);

  const emptyDataLength = MAX_LIST_LENGTH - data?.length;

  return (
    <StyledList>
      {data?.slice(0, MAX_LIST_LENGTH).map((folder: BucketFolder) => (
        <BucketFolderItem folder={folder} key={folder.id} />
      ))}
      {emptyDataLength > 0 &&
        Array.from({ length: emptyDataLength }).map((_, index) => (
          <li key={index}>
            <Button onClick={onOpen}>+</Button>
            <AddBucketFolderModal isOpen={isOpen} onClose={onClose} />
          </li>
        ))}
    </StyledList>
  );
};

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
`;

export default BucketFolderList;
