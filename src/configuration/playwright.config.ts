import { devices, type PlaywrightTestConfig } from '@playwright/test';
import type { TestFixtures } from '../tests/frontend/fixtures.js';
import os from 'os';

const config: PlaywrightTestConfig<TestFixtures> = {
  workers: 1,

  // Timeout for tests and hooks
  timeout: 5 * 60 * 1000,

  // Timeout for expect assertions
  expect: { timeout: 15 * 1000 },

  // Limit the number of failures on CI to save resources
  maxFailures: undefined,

  reporter: [
    ['list'],
    ['json', { outputFile: '../../test-results/test-results.json' }],
    ['junit', { outputFile: '../../test-results/FE_JUnit_Test_Report.xml' }],
    ['html', { open: 'never' }],
    [
      'allure-playwright',
      {
        detail: true,
        suiteTitle: true,
        environmentInfo: {
          os_platform: os.platform(),
          node_version: process.version,
          branch: process.env.BRANCH,
          browser: process.env.PROJECT,
        },
      },
    ],
  ],

  testDir: '../tests/frontend',

  use: {
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: {
      mode: 'on',
      fullPage: true,
    },
    actionTimeout: 30 * 1000,
    navigationTimeout: 30 * 1000,
    headless: true,
  },

  projects: [
    {
      name: 'desktop-chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chromium',
        viewport: { width: 1920, height: 1080 },
      },
    },
  ],
};

export default config;
