import React from 'react';
import { BucketFolder } from '@/lib/supabase/type';
import Link from 'next/link';
import styled from '@emotion/styled';
import { Text } from '@chakra-ui/react';

const BucketFolderItem = ({ folder }: { folder: BucketFolder }) => {
  return (
    <BucketFolder key={folder.id}>
      <Link href={`/bucketlist/${folder.id}`}>
        <Text textStyle={'h3'}>{folder.title}</Text>
      </Link>
    </BucketFolder>
  );
};

const BucketFolder = styled.li`
  width: 100%;
  height: 70px;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.grey[2]};
  border-radius: 12px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  cursor: pointer;
`;

export default BucketFolderItem;
