import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Gunakan fungsi untuk mendapatkan akses ke 'command' (build vs serve)
export default defineConfig(({ command }) => {
  return {
    // Jika sedang 'build' (ke GitHub), gunakan prefix /GradCircle/
    // Jika sedang 'serve' (npm run dev), gunakan root '/' agar tidak blank
    base: command === 'build' ? '/GradCircle/' : '/',
    plugins: [
      react(),
      tailwindcss(),
    ],
    server: {
      watch: {
        usePolling: true,
      },
    },
  }
})