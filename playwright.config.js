const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  retries: 2,
  workers: 1,
  reporter: "html",
  use: {
    baseURL: "https://qauto.forstudy.space/",
    trace: "on-first-retry",
    browsers: ["chromium", "firefox", "webkit"],
    timeout: 10000, // 10 seconds
    testMatch: ["**/*.spec.js"],
  },
});
