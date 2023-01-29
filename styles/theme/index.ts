import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

// Global styles (overrides)
import styles from './styles';

// Foundations
import * as foundations from './foundations';

// Components
import * as components from './components';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};
const theme = extendTheme({
  styles,
  config,
  ...foundations,
  components: {
    ...components,
  },
});
export default theme;
