import type { SVGProps, ReactNode } from "react";

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  children?: ReactNode;
}

export function Icon({ size = 24, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export default Icon;
