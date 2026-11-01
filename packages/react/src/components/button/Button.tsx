import type { ButtonHTMLAttributes } from "react";
import "./button.css";

export type ButtonVariant = "solid" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  active?: boolean;
}

/** A native button with the shared Chakra design tokens and focus behavior. */
export function Button({
  className = "",
  variant = "solid",
  size = "md",
  active = false,
  type = "button",
  ...props
}: ButtonProps) {
  const classes = ["chakra-button", `chakra-button--${variant}`, `chakra-button--${size}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={classes}
      data-active={active ? "true" : undefined}
      type={type}
      {...props}
    />
  );
}
