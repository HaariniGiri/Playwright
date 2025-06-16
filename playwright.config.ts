import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/AI_For_QA',
  use: {
    headless: false,
  },
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
  workers: 1,
}); 