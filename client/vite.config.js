import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  // Loads .env, .env.[mode], .env.[mode].local etc. into `env`
  const env = loadEnv(mode, ".", "");
  const configuredPort = Number.parseInt(env.PORT, 10);

  return {
    plugins: [react(), tailwindcss()],
    server: {
      port: Number.isInteger(configuredPort) ? configuredPort : 5173,
      host: true,
    },
  };
});
