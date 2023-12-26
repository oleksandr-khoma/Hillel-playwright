const { defineConfig } = require("@playwright/test");
import { config as testConfig } from "./config/config.ts";

module.exports = defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  retries: 0,
  workers: 1,
  reporter: "html",
  use: {
    baseURL: testConfig.baseURL,
    browsers: ["chrome", "firefox", "webkit"],
    timeout: 10000, // 10 seconds
    testMatch: ["**/*.spec.js"],
    headless: false,
    httpCredentials: testConfig.httpCredentials,
    viewport: {
      width: 1080,
      height: 720,
    },
  },
});
