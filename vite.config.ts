import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  // Relative asset paths make the app work both at a GitHub Pages subpath
  // (https://user.github.io/repo/) and inside the Capacitor Android WebView.
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'inline',
      includeAssets: ['favicon.svg', 'icons.svg'],
      manifest: {
        name: '고기 부위 도감 (Meat Guide)',
        short_name: '고기 도감',
        description: '소고기 및 돼지고기 부위 정보 안내 도감 모바일 앱',
        theme_color: '#ff4757',
        background_color: '#090d16',
        display: 'standalone',
        orientation: 'portrait',
        scope: './',
        start_url: './',
        icons: [
          {
            src: 'favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any'
          },
          {
            src: 'favicon.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      }
    })
  ],
})

