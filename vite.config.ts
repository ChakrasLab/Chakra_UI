import { defineConfig } from "vite";
import mdx from "@mdx-js/rollup";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
  base: mode === "pages" ? "/Chakra_UI/" : "/",
  plugins: [mdx(), react()],
  build: {
    outDir: "../../dist",
    emptyOutDir: true,
  },
}));
