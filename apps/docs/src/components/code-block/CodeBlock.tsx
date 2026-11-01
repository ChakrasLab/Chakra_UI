import { useEffect, useState } from "react";
import { Button } from "@chakra/react";
import { CheckIcon, CopyIcon } from "@chakra/icons";
import "./CodeBlock.css";

interface CodeBlockProps {
  code: string;
  label?: string;
}

export default function CodeBlock({ code, label = "Copy code" }: CodeBlockProps) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");

  useEffect(() => {
    if (copyState === "idle") return;
    const timeout = window.setTimeout(() => setCopyState("idle"), 1800);
    return () => window.clearTimeout(timeout);
  }, [copyState]);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  };

  return (
    <div className="docs-code-block">
      <pre><code>{code}</code></pre>
      <Button
        className="docs-code-block__copy"
        variant="ghost"
        size="sm"
        type="button"
        aria-label={copyState === "copied" ? "Code copied" : label}
        onClick={copyCode}
      >
        {copyState === "copied" ? <CheckIcon /> : <CopyIcon />}
      </Button>
      <span className="docs-code-block__status" role="status" aria-live="polite">
        {copyState === "copied" ? "Copied" : copyState === "failed" ? "Copy failed" : ""}
      </span>
    </div>
  );
}
