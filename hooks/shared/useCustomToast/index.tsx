import { useToast as useChakraToast } from '@chakra-ui/react';
import Toast from '@/components/toasts/Toast';
import { CustomToastProps } from '@/hooks/shared/useCustomToast/type';

const TOAST_DURATION = 2000;

export const useCustomToast = () => {
  const toast = useChakraToast();

  const openToast = ({ message, type }: CustomToastProps) => {
    return toast({
      position: 'top',
      duration: TOAST_DURATION,
      render: () => <Toast message={message} type={type} />,
    });
  };

  return {
    openToast,
  };
};

export default useCustomToast;
