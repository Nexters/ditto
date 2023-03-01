import React, { useState } from 'react';
import { Box, Divider, ModalBody, ModalFooter, ModalHeader, Text } from '@chakra-ui/react';
import BaseModal from '@/components/modals/BaseModal';
import TitleTextarea from '@/components/inputs/TitleTextarea';
import ContentTextarea from '@/components/inputs/ContentTextarea';
import styled from '@emotion/styled';
import BaseButton from '@/components/buttons/BaseButton';
import { useMutateBucketItems } from '@/hooks/bucketlist/useMutateBucketItems';
import { TrashCanIcon } from '@/components/icons';
import theme from '@/styles/theme';
import PartialLoader from '@/components/loading/PartialLoader';
import { useFetchBucketFolderById } from '@/hooks/bucketlist/useFetchBucketFolderById';
import { TBucketItem } from '@/lib/supabase/type';
import { formatCreationDate } from '@/utils/date';
import useChangeCreatorIdToName from '@/hooks/bucketlist/useChangeCreatorIdToName';

interface UpdateBucketItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  bucketItem: TBucketItem;
}

const UpdateBucketItemModal = ({ isOpen, onClose, bucketItem }: UpdateBucketItemModalProps) => {
  const { title, description, id, bucket_folder_id: folderId, created_time, creator_id } = bucketItem;
  const ModalContent = () => {
    const [itemTitle, setItemTitle] = useState(title);
    const [itemDesc, setItemDesc] = useState(description);

    const { updateBucketItemMutation, deleteBucketItemMutation } = useMutateBucketItems();
    const { mutate: updateBucketItem } = updateBucketItemMutation;
    const { mutate: deleteBucketItem } = deleteBucketItemMutation;

    const { data: folder, isLoading } = useFetchBucketFolderById(folderId);
    const { changeCreatorIdToName } = useChangeCreatorIdToName();

    const handleClickEditButton = () => {
      updateBucketItem(
        {
          title: itemTitle,
          description: itemDesc,
          id,
        },
        {
          onSuccess: () => {
            setItemTitle('');
            setItemDesc('');
            onClose();
          },
        }
      );
    };

    const handleClickDeleteButton = () => {
      deleteBucketItem(id, {
        onSuccess: () => {
          onClose();
        },
      });
    };

    return (
      <>
        <StyledModalHeader>
          <StyledModalHeaderText textStyle={'body1'}>
            {isLoading && <PartialLoader />}
            {folder?.title || ''}
          </StyledModalHeaderText>
        </StyledModalHeader>
        <ModalBody padding={0}>
          <TitleTextarea
            placeholder={'제목을 입력하세요'}
            height={94}
            value={itemTitle}
            onChange={(e) => {
              setItemTitle(e.target.value);
            }}
          />
          <Divider borderWidth={4} borderColor={'divider'} />
          <Box padding={'20px'}>
            <ContentTextarea
              placeholder={'설명을 입력하세요'}
              height={73}
              value={itemDesc ?? ''}
              onChange={(e) => {
                setItemDesc(e.target.value);
              }}
            />
          </Box>
          <CreatorText>
            <span>{formatCreationDate(created_time)}</span>
            <span>{changeCreatorIdToName(creator_id)}</span>
          </CreatorText>
        </ModalBody>
        <ModalFooter justifyContent={'space-between'}>
          <TrashCanIcon cursor="pointer" onClick={handleClickDeleteButton} />
          <BaseButton isDisabled={!itemTitle.length} onClick={handleClickEditButton}>
            수정하기
          </BaseButton>
        </ModalFooter>
      </>
    );
  };

  return <BaseModal isOpen={isOpen} onClose={onClose} modalContent={<ModalContent />} width={335} height={384} />;
};

const StyledModalHeader = styled(ModalHeader)`
  background-color: ${theme.colors.grey[8]};
  border-radius: 6px 6px 0px 0px;
  color: ${theme.colors.grey[1]};
  height: 56px;
`;

const StyledModalHeaderText = styled(Text)`
  padding-top: 4px;
  padding-bottom: 4px;
  text-align: center;
`;

const CreatorText = styled(Text)`
  display: flex;
  flex-direction: column;
  color: ${theme.colors.grey[4]};
  ${theme.textStyles.body3};
  margin-left: 20px;
  gap: 6px;
`;

export default UpdateBucketItemModal;
