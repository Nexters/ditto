import * as React from 'react';
import { SVGProps } from 'react';
const SvgKakaoIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#KakaoIcon_svg__a)">
      <path
        d="M11.998 4.5c-4.554 0-8.248 2.94-8.248 6.57 0 2.306 1.494 4.334 3.75 5.508l-.624 3.23 3.569-2.286c.502.076 1.023.12 1.553.12 4.558 0 8.249-2.941 8.249-6.57 0-3.628-3.691-6.572-8.249-6.572Z"
        fill="#3E1918"
      />
    </g>
    <defs>
      <clipPath id="KakaoIcon_svg__a">
        <path fill="#fff" transform="translate(3.75 4.5)" d="M0 0h16.5v15.307H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgKakaoIcon;
