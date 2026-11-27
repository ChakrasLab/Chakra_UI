import { cloneElement, useId, type ReactElement } from "react";
import "./tooltip.css";

export interface TooltipProps {
  content: string;
  children: ReactElement<{ "aria-describedby"?: string }>;
  className?: string;
}

/** Adds a hover and focus tooltip to one interactive child. */
export function Tooltip({ content, children, className = "" }: TooltipProps) {
  const tooltipId = useId();
  const existingDescription = children.props["aria-describedby"];
  const describedBy = [existingDescription, tooltipId].filter(Boolean).join(" ");
  const trigger = cloneElement(children, { "aria-describedby": describedBy });

  return (
    <span className={`chakra-tooltip ${className}`.trim()}>
      {trigger}
      <span className="chakra-tooltip__content" id={tooltipId} role="tooltip">{content}</span>
    </span>
  );
}
