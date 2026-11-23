import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'

// Patch for Windows sandbox where fs.realpath.native throws EPERM on drive paths
if (fs.realpath && fs.realpath.native) {
  fs.realpath.native = fs.realpath;
}
if (fs.realpathSync && fs.realpathSync.native) {
  fs.realpathSync.native = fs.realpathSync;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})

