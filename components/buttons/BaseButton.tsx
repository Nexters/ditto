import { Button } from '@chakra-ui/react';

interface BaseButtonProps {
  isDisabled?: boolean;
  label?: string;
}

const BaseButton = (props: BaseButtonProps) => {
  const { isDisabled, label } = props;
  return (
    <Button
      bgColor={isDisabled ? 'disabled' : 'secondary'}
      color={'white'}
      _hover={{ bgColor: isDisabled ? 'disabled' : 'secondary' }}
    >
      {label}
    </Button>
  );
};

export default BaseButton;
