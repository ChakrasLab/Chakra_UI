import { useId, type InputHTMLAttributes, type ReactNode } from "react";
import "../form-controls.css";

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: ReactNode;
  description?: ReactNode;
  invalid?: boolean;
  name: string;
}

/** A labeled native radio option. Give related options the same name. */
export function Radio({
  label,
  description,
  invalid,
  className = "",
  ...props
}: RadioProps) {
  const descriptionId = useId();
  const describedBy = [props["aria-describedby"], description ? descriptionId : undefined]
    .filter(Boolean)
    .join(" ") || undefined;

  return (
    <label className={`chakra-choice ${className}`.trim()} data-disabled={props.disabled || undefined} data-invalid={invalid || undefined}>
      <input
        {...props}
        className="chakra-choice__input"
        type="radio"
        aria-invalid={invalid ? true : props["aria-invalid"]}
        aria-describedby={describedBy}
      />
      <span className="chakra-choice__content">
        <span className="chakra-choice__label">{label}</span>
        {description && <span className="chakra-choice__description" id={descriptionId}>{description}</span>}
      </span>
    </label>
  );
}
