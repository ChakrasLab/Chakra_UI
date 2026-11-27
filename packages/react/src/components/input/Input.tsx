import type { InputHTMLAttributes } from "react";
import "../form-controls.css";

export type InputSize = "sm" | "md" | "lg";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: InputSize;
  invalid?: boolean;
}

/** A native text input styled with shared semantic tokens. Pair it with a visible label. */
export function Input({ className = "", size = "md", invalid, ...props }: InputProps) {
  const classes = ["chakra-input", `chakra-input--${size}`, className].filter(Boolean).join(" ");

  return (
    <input
      {...props}
      className={classes}
      aria-invalid={invalid ? true : props["aria-invalid"]}
      data-invalid={invalid ? "true" : undefined}
    />
  );
}
