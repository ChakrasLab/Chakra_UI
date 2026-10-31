import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@chakra/tokens/index.css";
import App from "./App";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
