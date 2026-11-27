import type { SelectHTMLAttributes } from "react";
import "../form-controls.css";

export type SelectSize = "sm" | "md" | "lg";

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  size?: SelectSize;
  invalid?: boolean;
}

/** A native select control styled with shared semantic tokens. Pair it with a visible label. */
export function Select({ className = "", size = "md", invalid, children, ...props }: SelectProps) {
  const classes = ["chakra-select", `chakra-select--${size}`, className].filter(Boolean).join(" ");

  return (
    <select
      {...props}
      className={classes}
      aria-invalid={invalid ? true : props["aria-invalid"]}
      data-invalid={invalid ? "true" : undefined}
    >
      {children}
    </select>
  );
}
