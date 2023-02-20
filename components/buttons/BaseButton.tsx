import { Button } from '@chakra-ui/react';

interface BaseButtonProps {
  isDisabled?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
}

const BaseButton = (props: BaseButtonProps) => {
  const { isDisabled, children, onClick } = props;
  return (
    <Button
      bgColor={isDisabled ? 'disabled' : 'secondary'}
      color={'white'}
      _hover={{ bgColor: isDisabled ? 'disabled' : 'secondary' }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default BaseButton;
