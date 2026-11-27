import { useId, type InputHTMLAttributes, type ReactNode } from "react";
import "../form-controls.css";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: ReactNode;
  description?: ReactNode;
  invalid?: boolean;
}

/** A labeled native checkbox with optional helper text. */
export function Checkbox({
  label,
  description,
  invalid,
  className = "",
  ...props
}: CheckboxProps) {
  const descriptionId = useId();
  const describedBy = [props["aria-describedby"], description ? descriptionId : undefined]
    .filter(Boolean)
    .join(" ") || undefined;

  return (
    <label className={`hobiui-choice ${className}`.trim()} data-disabled={props.disabled || undefined} data-invalid={invalid || undefined}>
      <input
        {...props}
        className="hobiui-choice__input"
        type="checkbox"
        aria-invalid={invalid ? true : props["aria-invalid"]}
        aria-describedby={describedBy}
      />
      <span className="hobiui-choice__content">
        <span className="hobiui-choice__label">{label}</span>
        {description && <span className="hobiui-choice__description" id={descriptionId}>{description}</span>}
      </span>
    </label>
  );
}
