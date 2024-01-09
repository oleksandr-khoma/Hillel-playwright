const { defineConfig, devices } = require("@playwright/test");
import { config as testConfig } from "./config/config.ts";

module.exports = defineConfig({
  // testDir: "./tests",
  testMatch: "/tests/**/*.spec.js",
  testIgnore: "/tests/**/test.spec.js",
  globalSetup: "./globalSetup.js",
  fullyParallel: false,
  retries: 0,
  workers: 1,
  reporter: "html",
  use: {
    baseURL: testConfig.baseURL,
    browsers: ["chrome", "firefox", "webkit"],
    timeout: 10000, // 10 seconds
    // testMatch: ["**/*.spec.js"],
    headless: false,
    httpCredentials: testConfig.httpCredentials,
    viewport: {
      width: 1080,
      height: 720,
    },
  },
  projects: [
    {
      name: "global-setup",
      testMatch: "tests/setup/*.setup.js",
    },
    {
      name: "e2e chrome",
      use: { ...devices["Desktop Chrome"] },
      dependencies: ["global-setup"],
    },
  ],
});
