import * as React from 'react';
import { SVGProps } from 'react';
const SvgTrashCanIcon = (props: SVGProps<SVGSVGElement> & { disabled: boolean }) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...(props.disabled && { pointerEvents: 'none' })}
    {...props}
  >
    <path
      d="M27 8H5m8 6v8m6-8v8m6-14v19a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8m14 0V6a2 2 0 0 0-2-2h-6a2 2 0 0 0-2 2v2"
      stroke={props.disabled ? '#DDDDDD' : '#4E4E4E'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SvgTrashCanIcon;
