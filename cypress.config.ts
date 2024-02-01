import { defineConfig } from "cypress";

export default defineConfig({
  chromeWebSecurity: false,
  e2e: {
    setupNodeEvents(on, config) {
    },
  },
  env: {
    USERNAME: 'tausif',
    PASSWORD: 'r123',
    BASE_URL: 'http://localhost:3000',
  },
});
