import * as React from 'react';
import { SVGProps } from 'react';

const SvgTrashCan = (props: SVGProps<SVGSVGElement> & { disabled: boolean }) => (
  <svg
    width={32}
    height={32}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...(props.disabled && { pointerEvents: 'none' })}
    {...props}
  >
    <path
      d="M27 8H5M13 14v8M19 14v8M25 8v19a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8M21 8V6a2 2 0 0 0-2-2h-6a2 2 0 0 0-2 2v2"
      stroke={props.disabled ? '#DDDDDD' : '#4E4E4E'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SvgTrashCan;
