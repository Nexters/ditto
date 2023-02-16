import { BucketItem as TBucketItem } from '@/lib/supabase/type';
import UpdateBucketItemModal from '@/components/modals/UpdateBucketItemModal';
import { Text, useDisclosure } from '@chakra-ui/react';
import PawButton from '@/components/buttons/PawButton';
import styled from '@emotion/styled';

const BucketItem = ({ item }: { item: TBucketItem }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Item onClick={onOpen}>
      <Text textStyle={'h3'}>{item.title}</Text>
      <PawButton isCompleted={item.completed} />
      <UpdateBucketItemModal isOpen={isOpen} onClose={onClose} />
    </Item>
  );
};

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 64px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey[2]};
`;

export default BucketItem;
