import { Box, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import theme from '@/styles/theme';
import { ToastAlertIcon, ToastSuccessIcon } from '@/components/icons';
import { CustomToastProps } from '@/hooks/shared/useCustomToast/type';

const Toast = ({ message, type }: CustomToastProps) => {
  return (
    <ToastWrapper>
      {type === 'error' && <ToastAlertIcon />}
      {type === 'success' && <ToastSuccessIcon />}
      <Text textStyle={'body2'} color={'white'}>
        {message}
      </Text>
    </ToastWrapper>
  );
};

const ToastWrapper = styled(Box)`
  width: 335px;
  height: 60px;
  background: ${theme.colors.grey[9]};
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
`;

export default Toast;
