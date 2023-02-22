import { useToast as useChakraToast } from '@chakra-ui/react';
import Toast from '@/components/toasts/Toast';

export const TOAST_DURATION = 2000;

export const TOAST_TYPE = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
} as const;

export type ToastType = (typeof TOAST_TYPE)[keyof typeof TOAST_TYPE];

export interface CustomToastProps {
  message: string;
  type: ToastType;
}

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
