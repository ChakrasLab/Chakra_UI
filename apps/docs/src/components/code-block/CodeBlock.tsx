import { useEffect, useId, useRef, useState } from "react";
import { Button } from "@chakra/react";
import { CheckIcon, CopyIcon } from "@chakra/icons";
import "./CodeBlock.css";

interface CodeBlockProps {
  code: string;
  label?: string;
}

export default function CodeBlock({ code, label = "Copy code" }: CodeBlockProps) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const codeId = useId();
  const blockRef = useRef<HTMLDivElement | null>(null);
  const copyTimeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => window.clearTimeout(copyTimeoutRef.current);
  }, []);

  const copyCode = async (text = code) => {
    window.clearTimeout(copyTimeoutRef.current);
    try {
      await navigator.clipboard.writeText(text);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
    copyTimeoutRef.current = window.setTimeout(() => {
      setCopyState("idle");
      copyTimeoutRef.current = undefined;
    }, 1800);
  };

  useEffect(() => {
    const handleCommand = (event: Event) => {
      const commandEvent = event as CommandEvent;
      if (commandEvent.command !== "--copy") return;
      const source = commandEvent.source;
      const target = commandEvent.target;
      if (
        !(source instanceof HTMLButtonElement) ||
        !blockRef.current?.contains(source) ||
        !(target instanceof HTMLElement)
      ) return;
      event.preventDefault();
      void copyCode(target.innerText.trim());
    };

    document.addEventListener("command", handleCommand, true);
    return () => document.removeEventListener("command", handleCommand, true);
  }, [code]);

  return (
    <div ref={blockRef} className="docs-code-block" data-copy-state={copyState}>
      <pre id={codeId} tabIndex={0}><code>{code}</code></pre>
      <Button
        className="docs-code-block__copy"
        variant="ghost"
        size="sm"
        type="button"
        {...({ command: "--copy", commandfor: codeId } as any)}
        aria-label={label}
        onClick={() => {
          if (!("CommandEvent" in window)) void copyCode();
        }}
      >
        {copyState === "copied" ? <CheckIcon /> : <CopyIcon />}
      </Button>
      <span className="docs-code-block__status" role="status" aria-live="polite">
        {copyState === "copied" ? "Copied" : copyState === "failed" ? "Copy failed" : ""}
      </span>
    </div>
  );
}
