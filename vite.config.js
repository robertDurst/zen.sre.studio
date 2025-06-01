import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    allowedHosts: ['zen.sre.studio', 'www.zen.sre.studio'],
    host: true,
    port: 5173
  }
});
