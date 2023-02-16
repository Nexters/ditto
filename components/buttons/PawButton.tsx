import { IconButton } from '@chakra-ui/react';
import { GrayPawIcon, PawIcon } from '@/components/icons';

const PawButton = ({ isCompleted = false }: { isCompleted?: boolean }) => {
  return (
    <IconButton
      bg={'transparent'}
      icon={isCompleted ? <PawIcon /> : <GrayPawIcon />}
      aria-label={'paw icon'}
    ></IconButton>
  );
};

export default PawButton;
