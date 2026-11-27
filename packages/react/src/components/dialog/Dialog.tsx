import { useEffect, useId, useRef, type DialogHTMLAttributes, type ReactNode } from "react";
import { Button } from "../button/Button";
import "./dialog.css";

export interface DialogProps extends Omit<DialogHTMLAttributes<HTMLDialogElement>, "open" | "onClose" | "onCancel" | "onClick" | "title" | "children"> {
  open: boolean;
  title: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
  closeLabel?: string;
  closeOnEscape?: boolean;
  closeOnBackdrop?: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

/** A controlled modal dialog built on the native dialog element. */
export function Dialog({
  open,
  title,
  description,
  footer,
  closeLabel = "Close dialog",
  closeOnEscape = true,
  closeOnBackdrop = false,
  onOpenChange,
  children,
  className = "",
  ...props
}: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      {...props}
      ref={dialogRef}
      className={`chakra-dialog ${className}`.trim()}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onCancel={(event) => {
        if (!closeOnEscape) event.preventDefault();
      }}
      onClose={() => onOpenChange(false)}
      onClick={(event) => {
        if (closeOnBackdrop && event.target === event.currentTarget) {
          const bounds = event.currentTarget.getBoundingClientRect();
          const clickedOutside = event.clientX < bounds.left || event.clientX > bounds.right
            || event.clientY < bounds.top || event.clientY > bounds.bottom;
          if (clickedOutside) dialogRef.current?.close();
        }
      }}
    >
      <header className="chakra-dialog__header">
        <div className="chakra-dialog__heading">
          <h2 id={titleId}>{title}</h2>
          {description && <p id={descriptionId}>{description}</p>}
        </div>
        <Button
          className="chakra-dialog__close"
          variant="ghost"
          type="button"
          aria-label={closeLabel}
          onClick={() => dialogRef.current?.close()}
        >
          <span aria-hidden="true">×</span>
        </Button>
      </header>
      <div className="chakra-dialog__body">{children}</div>
      {footer && <footer className="chakra-dialog__footer">{footer}</footer>}
    </dialog>
  );
}
