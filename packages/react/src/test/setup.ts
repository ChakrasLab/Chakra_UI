import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => {
  cleanup();
});

if (typeof HTMLDialogElement !== "undefined") {
  const dialogPrototype = HTMLDialogElement.prototype;

  if (typeof dialogPrototype.showModal !== "function") {
    Object.defineProperty(dialogPrototype, "showModal", {
      configurable: true,
      value(this: HTMLDialogElement) {
        this.setAttribute("open", "");
      },
    });
  }

  if (typeof dialogPrototype.close !== "function") {
    Object.defineProperty(dialogPrototype, "close", {
      configurable: true,
      value(this: HTMLDialogElement, returnValue = "") {
        this.returnValue = returnValue;
        this.removeAttribute("open");
        this.dispatchEvent(new Event("close", { bubbles: true }));
      },
    });
  }
}
