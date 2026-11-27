import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    clearMocks: true,
    environment: "jsdom",
    include: ["packages/react/src/test/**/*.test.{ts,tsx}"],
    restoreMocks: true,
    setupFiles: ["./packages/react/src/test/setup.ts"],
  },
});
