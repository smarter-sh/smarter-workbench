import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import { comlink } from "vite-plugin-comlink";

import { CDN_HOST_BASE_URL } from "./src/shared/constants";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const commonConfig = {
    plugins: [react(), comlink()],
    build: {
      sourcemap: true,
      outDir: "../build",
      assetsDir: "assets",
      rollupOptions: {
        input: {
          main: resolve(__dirname, "src/index.html"),
          helloWorld: resolve(__dirname, "src/hello-world.html"),
        },
        external: [],
      },
    },
    root: "src",
    publicDir: resolve(__dirname, "src/public"),
    optimizeDeps: {
      include: ["@smarter.sh/ui-chat", "@chatscope/chat-ui-kit-react"],
    },
  };

  if (mode === "dev") {
    return {
      ...commonConfig,
      base: "/",
      server: {
        port: 3000,
        open: true,
      },
    };
  } else {
    return {
      ...commonConfig,
      base: CDN_HOST_BASE_URL,
    };
  }
});
