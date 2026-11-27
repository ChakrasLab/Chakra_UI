import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@hobiui/tokens/index.css";
import "@hobiui/react/style.css";
import App from "./App";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
