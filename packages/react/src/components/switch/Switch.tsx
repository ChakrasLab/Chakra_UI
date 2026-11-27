import { useId, type InputHTMLAttributes, type ReactNode } from "react";
import "../form-controls.css";

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: ReactNode;
  description?: ReactNode;
}

/** A native checkbox exposed as a switch for an immediate on/off setting. */
export function Switch({ label, description, className = "", ...props }: SwitchProps) {
  const descriptionId = useId();
  const describedBy = [props["aria-describedby"], description ? descriptionId : undefined]
    .filter(Boolean)
    .join(" ") || undefined;

  return (
    <label className={`chakra-switch ${className}`.trim()} data-disabled={props.disabled || undefined}>
      <input
        {...props}
        className="chakra-switch__input"
        type="checkbox"
        role="switch"
        aria-describedby={describedBy}
      />
      <span className="chakra-choice__content">
        <span className="chakra-choice__label">{label}</span>
        {description && <span className="chakra-choice__description" id={descriptionId}>{description}</span>}
      </span>
    </label>
  );
}
