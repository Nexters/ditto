import type { Theme as ChakraTheme, ThemeConfig } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';

// Global styles (overrides)
import styles from './styles';

// Foundations
import { foundations } from './foundations';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};
const theme = extendTheme({
  styles,
  config,
  ...foundations,
  components: {
    // Components
    Textarea: {
      variants: {
        outline: {
          _placeholder: {
            color: `${foundations.colors.grey[3]}`,
          },
        },
        unstyled: {
          _placeholder: {
            color: `${foundations.colors.grey[3]}`,
          },
        },
      },
    },
  },
}) as Theme;

type Theme = ChakraTheme & typeof foundations;

export type { Theme };
export default theme;
