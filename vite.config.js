import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Public credential verification (RTL joining letters and certificates) is served by the
// Growth Desk API; the website forwards /verify so links read sustainablesolution360.com/verify/<code>.
const CREDENTIALS_API = process.env.CREDENTIALS_API || "https://social-media-tracker-and-business-growth-production.up.railway.app";
const verifyProxy = { "/verify": { target: CREDENTIALS_API, changeOrigin: true, xfwd: true } };

export default defineConfig({
  plugins: [react()],
  server: { proxy: verifyProxy },
  preview: { proxy: verifyProxy },
});
