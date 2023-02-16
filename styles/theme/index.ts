import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

// Global styles (overrides)
import styles from './styles';

// Foundations
import * as foundations from './foundations';

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
});
type Theme = typeof theme;
export type { Theme };
export default theme;
