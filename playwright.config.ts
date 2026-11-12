import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { open: 'never' }],
    ['list']
  ],
  timeout: 60 * 1000,
  expect: {
    timeout: 10 * 1000,
  },
  use: {
    // Point the framework at the application under test, e.g. BASE_URL=https://example.com npx playwright test
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    // Uncomment if the application uses a custom test id attribute (for example data-test or data-qa).
    // testIdAttribute: 'data-test',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: true,
    actionTimeout: 15 * 1000,
    navigationTimeout: 30 * 1000,
  },
  projects: [
    // Optional: log in once and reuse the session in every test.
    // 1. Create tests/auth.setup.ts that logs in and calls
    //    page.context().storageState({ path: 'playwright/.auth/user.json' }).
    // 2. Uncomment the "setup" project and the storageState/dependencies lines below.
    // {
    //   name: 'setup',
    //   testMatch: /.*\.setup\.ts/,
    //   use: { ...devices['Desktop Chrome'] },
    // },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // storageState: 'playwright/.auth/user.json',
      },
      // dependencies: ['setup'],
    },
    // Uncomment below browsers later when needed
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});
