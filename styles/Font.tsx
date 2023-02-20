import { Global } from '@emotion/react';

const Fonts = () => (
  <Global
    styles={`
      @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.6/dist/web/variable/pretendardvariable-dynamic-subset.css");

      @font-face {
        font-family: 'Happiness-Sans';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: local('Happiness-Sans-Bold'), url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2205@1.0/Happiness-Sans-Bold.woff2') format('woff2');
      }
      @font-face {
        font-family: 'Happiness-Sans';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: local(Happiness-Sans-Regular), url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2205@1.0/Happiness-Sans-Regular.woff2') format('woff2');
      }
      `}
  />
);

export default Fonts;
