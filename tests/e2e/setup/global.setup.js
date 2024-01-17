import { test as setup, expect } from "@playwright/test";
import HomePage from "../../pageobjects/HomePage.js";
import { USERS } from "../../src/data/users.js";
import { STORAGE_STATE_USER_PATH } from "../../src/data/constants/storageState.js";

setup("login as user and save storage state", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigate("/");
  const signInPopup = await homePage.clickSignInButtonAndOpenPopup();
  const garagePage = await signInPopup.loginWithCredentials(
    USERS.KHOMA.email,
    USERS.KHOMA.password
  );
  await expect(garagePage.addCarButton).toBeVisible();

  await page.context().storageState({
    path: STORAGE_STATE_USER_PATH,
  });
});
