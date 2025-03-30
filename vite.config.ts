import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "url";

const getAliasPath = (path: string) => {
  return fileURLToPath(new URL(path, import.meta.url));
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": getAliasPath("src"),
      "@layout": getAliasPath("src/layout"),
      "@components": getAliasPath("src/components"),
      "@services": getAliasPath("src/services"),
    },
  },
});
