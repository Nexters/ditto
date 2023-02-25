import { IconButton } from '@chakra-ui/react';
import { GrayPawIcon, PawIcon } from '@/components/icons';

interface PawButtonProps {
  isCompleted?: boolean;
  onClick: () => void;
}

const PawButton = ({ isCompleted, onClick }: PawButtonProps) => {
  return (
    <IconButton
      bg={'transparent'}
      icon={isCompleted ? <PawIcon /> : <GrayPawIcon />}
      aria-label={'paw icon'}
      onClick={onClick}
    ></IconButton>
  );
};

export default PawButton;
