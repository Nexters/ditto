import * as React from 'react';
import { SVGProps } from 'react';
const SvgToastSuccessIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={40} height={40} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g filter="url(#ToastSuccessIcon_svg__a)">
      <circle cx={20} cy={20} r={16} fill="#23CF69" />
    </g>
    <path
      d="M26.875 15.188 19.312 25.5l-5.156-5.844"
      stroke="#F6F8F9"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <filter
        id="ToastSuccessIcon_svg__a"
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
        <feColorMatrix values="0 0 0 0 0.137255 0 0 0 0 0.811765 0 0 0 0 0.411765 0 0 0 0.4 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_583_5595" />
        <feBlend in="SourceGraphic" in2="effect1_dropShadow_583_5595" result="shape" />
      </filter>
    </defs>
  </svg>
);
export default SvgToastSuccessIcon;
