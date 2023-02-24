import { BucketItem as TBucketItem } from '@/lib/supabase/type';
import UpdateBucketItemModal from '@/components/modals/UpdateBucketItemModal';
import { Text, useDisclosure } from '@chakra-ui/react';
import PawButton from '@/components/buttons/PawButton';
import styled from '@emotion/styled';
import { useMutateBucketItems } from '@/hooks/bucketlist/useMutateBucketItems';

const BucketItem = ({ item }: { item: TBucketItem }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { completeBucketItemMutation } = useMutateBucketItems();
  const { mutate: completeBucketItem } = completeBucketItemMutation;

  const handleClickPawButton = () => {
    completeBucketItem({
      id: item.id,
      completed: !item.completed,
    });
  };

  return (
    <>
      <Item>
        <TitleSection onClick={onOpen}>
          <Text textStyle={'h3'}>{item.title}</Text>
        </TitleSection>
        <PawBtnSection>
          <PawButton isCompleted={item.completed} onClick={handleClickPawButton} />
        </PawBtnSection>
      </Item>
      <UpdateBucketItemModal
        isOpen={isOpen}
        onClose={onClose}
        title={item.title}
        description={item.description}
        id={item.id}
      />
    </>
  );
};

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 64px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey[2]};
  padding: 8px 20px;
  cursor: pointer;
`;

const TitleSection = styled.section`
  display: inherit;
  align-items: inherit;
  width: 80%;
  height: 100%;
`;

const PawBtnSection = styled.section`
  width: 20%;
  height: 100%;
  display: inherit;
  align-items: center;
  justify-content: flex-end;
`;

export default BucketItem;
