const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  retries: 0,
  workers: 1,
  reporter: "html",
  use: {
    baseURL: "https://qauto.forstudy.space/",
    browsers: ["chrome", "firefox", "webkit"],
    timeout: 10000, // 10 seconds
    testMatch: ["**/*.spec.js"],
    headless: false,
    httpCredentials: {
      username: "guest",
      password: "welcome2qauto",
    },
    viewport: {
      width: 1080,
      height: 720,
    },
  },
});
