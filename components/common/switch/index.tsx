import theme from '@/styles/theme';
import { Switch as ChakraSwitch } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const Switch = styled(ChakraSwitch)`
  --switch-track-width: 34px;
  & > span {
    width: 32px;
    height: 14px;
    &[data-checked] {
      --switch-bg: ${theme.colors.orange};
    }
    & > span {
      width: 14px;
      height: 14px;
    }
  }
`;
