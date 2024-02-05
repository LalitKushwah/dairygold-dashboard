import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    testIsolation: false,
    setupNodeEvents(on, config) {},
  },
  env: {
    USERNAME: 'tausif',
    PASSWORD: 'r123',
    BASE_URL: 'http://localhost:3000',
  },
});
