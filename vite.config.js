import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "Sports News",
        short_name: "Sportswave",
        theme_color: "#AAF", // Ensure this property is correctly defined
        background_color: "#FFF", // It's good practice to also define a background color
        display: "standalone", // Common PWA property for display mode
        start_url: "/", // Define the start URL for your app
        icons: [
          {
            src: "android-chrome-512x512.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    })
  ]
});
