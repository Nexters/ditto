import * as React from 'react';
import { SVGProps } from 'react';
const SvgToastAlertIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={40} height={40} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g filter="url(#ToastAlertIcon_svg__a)">
      <circle cx={20} cy={20} r={16} fill="#F54141" />
    </g>
    <path d="M20 13v9.333" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 28a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" fill="#fff" />
    <defs>
      <filter
        id="ToastAlertIcon_svg__a"
        x={0}
        y={0}
        width={40}
        height={40}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0.960784 0 0 0 0 0.254902 0 0 0 0 0.254902 0 0 0 0.4 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_583_5611" />
        <feBlend in="SourceGraphic" in2="effect1_dropShadow_583_5611" result="shape" />
      </filter>
    </defs>
  </svg>
);
export default SvgToastAlertIcon;
