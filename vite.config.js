import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  console.log("Ambiente atual:", mode);
  return {
    plugins: [react()],
    define: {
      __APP_ENV__: JSON.stringify(mode),
    },
  };
});
