import * as React from 'react';
import { SVGProps } from 'react';

type CustomSvgProps = SVGProps<SVGSVGElement> & {
  strokeColor?: string;
};

const PlusWhiteIcon = ({ strokeColor = '#fff', ...props }: CustomSvgProps) => {
  return (
    <svg width={32} height={32} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M5 16h22M16 5v22" stroke={strokeColor} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
export default PlusWhiteIcon;
