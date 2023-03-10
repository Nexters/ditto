import * as React from 'react';
import { SVGProps } from 'react';
const SvgCloseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={32} height={32} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M25 7 7 25m18 0L7 7" stroke="#000" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export default SvgCloseIcon;
