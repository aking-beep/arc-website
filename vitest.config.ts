import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      // Match the `@/*` path alias from tsconfig.json so tests import the same
      // way the application does.
      "@": fileURLToPath(new URL("./", import.meta.url)),
      // `server-only` throws unless it is resolved under React's react-server
      // condition, which vitest does not set. Stubbing it lets the modules it
      // guards be unit-tested; the guard still does its job in the real build.
      "server-only": fileURLToPath(new URL("./tests/stubs/server-only.ts", import.meta.url)),
    },
  },
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
  },
});
