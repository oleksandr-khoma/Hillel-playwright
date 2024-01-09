import { test as base, request } from "@playwright/test";
import HomePage from "../../pageobjects/HomePage.js";
import { USERS } from "../data/users.js";
import { STORAGE_STATE_USER_PATH } from "../data/constants/storageState.js";
import GaragePage from "../../pageobjects/GaragePage.js";

export const test = base.extend({
  MESSAGES: ["HELLO"],
  userGaragePage: async ({ page, MESSAGES }, use) => {
    const homePage = new HomePage(page);
    await homePage.navigate("/");
    const signInPopup = await homePage.clickSignInButtonAndOpenPopup();
    const garagePage = await signInPopup.loginWithCredentials(
      USERS.KHOMA.email,
      USERS.KHOMA.password
    );

    // Usage
    await use(garagePage);

    // Clean up
    console.log("DELETE USER");
  },
  userGaragePageWithStorage: async ({ browser, MESSAGES }, use) => {
    const ctx = await browser.newContext({
      storageState: STORAGE_STATE_USER_PATH,
    });
    const page = await ctx.newPage();
    const garagePage = new GaragePage(page);
    await garagePage.navigate("/panel/garage");

    // Usage
    await use(garagePage);

    // Clean up
    await ctx.close();
  },
  apiClient: async ({ browser, MESSAGES }, use) => {
    const client = await request.newContext({
      storageState: STORAGE_STATE_USER_PATH,
    });
    // Usage
    await use(client);
    // Clean up
    await client.dispose();
  },
});
