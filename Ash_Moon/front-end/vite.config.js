import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "localhost", // or "0.0.0.0" to allow access from the network
    port: 3000, // Set the desired port number
  },
});
