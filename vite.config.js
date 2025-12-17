// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "Icons/favicon.ico",
        "Icons/apple-touch-icon.png",
        "Icons/favicon-16x16.png",
        "Icons/favicon-32x32.png",
      ],
      manifest: {
        name: "WasteNot",
        short_name: "WasteNot",
        description: "Learn, play, and reduce waste!",
        theme_color: "#0E3386",
        background_color: "#E6EDF4",
        display: "standalone",
        orientation: "landscape",
        start_url: "/kv6014/Waste-not/",
        scope: "/kv6014/Waste-not/",
        icons: [
          {
            src: "/kv6014/Waste-not/Icons/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/kv6014/Waste-not/Icons/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/kv6014/Waste-not/Icons/pwa-maskable-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/kv6014/Waste-not/Icons/pwa-maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
  base: "/kv6014/Waste-not/",
});
