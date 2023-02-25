import React from 'react';
import { BucketFolder } from '@/lib/supabase/type';
import styled from '@emotion/styled';
import { Text, useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import UpdateBucketFolderModal from '@/components/modals/bucketList/UpdateBucketFolderModal';

const BucketFolderItem = ({ folder }: { folder: BucketFolder }) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClickTitle = () => {
    router.push(`/bucketlist/${folder.id}`);
  };

  return (
    <>
      <BucketFolder key={folder.id}>
        <TitleSection onClick={handleClickTitle}>
          <Text textStyle={'h3'}>{folder.title}</Text>
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
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.grey[2]};
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
