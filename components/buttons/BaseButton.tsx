import { Button } from '@chakra-ui/react';

const BaseButton = ({ isDisabled = false }: { isDisabled?: boolean }) => {
  return (
    <Button
      bgColor={isDisabled ? 'disabled' : 'secondary'}
      color={'white'}
      _hover={{ bgColor: isDisabled ? 'disabled' : 'secondary' }}
    >
      버튼
    </Button>
  );
};

export default BaseButton;
