import type { ReactNode } from "react";
import type { IconProps } from "./types";

/** Shared SVG wrapper for consistent sizing, stroke, and accessible defaults. */
export function createIcon(name: string, artwork: ReactNode) {
  function IconComponent({ size = 24, title, className, ...props }: IconProps) {
    const accessibleName = title ?? props["aria-label"];
    const isInformative = Boolean(accessibleName || props["aria-labelledby"]);

    return (
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        role={props.role ?? (isInformative ? "img" : undefined)}
        aria-label={accessibleName}
        aria-hidden={props["aria-hidden"] ?? !isInformative}
        focusable="false"
        className={className}
        {...props}
      >
        {title && <title>{title}</title>}
        {artwork}
      </svg>
    );
  }

  IconComponent.displayName = name;
  return IconComponent;
}
