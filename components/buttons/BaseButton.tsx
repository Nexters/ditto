import { Button } from '@chakra-ui/react';

interface BaseButtonProps {
  isDisabled?: boolean;
  label?: string;
  onClick?: () => void;
}

const BaseButton = (props: BaseButtonProps) => {
  const { isDisabled, label, onClick } = props;
  return (
    <Button
      bgColor={isDisabled ? 'disabled' : 'secondary'}
      color={'white'}
      _hover={{ bgColor: isDisabled ? 'disabled' : 'secondary' }}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default BaseButton;
