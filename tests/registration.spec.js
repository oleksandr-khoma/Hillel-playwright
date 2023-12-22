const { expect, test } = require("@playwright/test");
import { faker } from "@faker-js/faker";
import BasePage from "../pageobjects/BasePage";
import HomePage from "../pageobjects/HomePage";
import SignUpPopup from "../components/SignUpPopup";
import SettingsPage from "../pageobjects/SettingsPage";
import GaragePage from "../pageobjects/GaragePage";
import RemoveAccountPopup from "../components/RemoveAccountPopup";

test.describe("As User I should be able to register on the site", () => {
  let basepage;
  let homepage;
  let signUpPopup;
  let garagePage;
  let settings;
  let removeAccountPopup;

  test.beforeEach(async ({ page }) => {
    basepage = new BasePage(page);
    homepage = new HomePage(page);
    signUpPopup = new SignUpPopup(page);
    garagePage = new GaragePage(page);
    settings = new SettingsPage(page);
    removeAccountPopup = new RemoveAccountPopup(page);
    await basepage.navigate("/");
    await homepage.signUpButton.click();
  });

  test("checks registration with valid credentials", async () => {
    // Generate random credentials:
    const userName = faker.person.firstName().replace(/[-'`"]/, "");
    const userLastName = faker.person.lastName().replace(/[-'`"]/, "");
    const userEmail = faker.internet.email();
    const password = faker.internet.password();

    // Fill in the form:
    await signUpPopup.fillRegistrationForm(
      userName,
      userLastName,
      userEmail,
      password
    );
    await signUpPopup.submit.click();

    // Delete the user:
    await garagePage.openSettings();
    await settings.openRemoveAccountModal();
    await removeAccountPopup.confirmRemoveAccount();
    await homepage.signUpButton.isVisible();
  });

  test("checks registration form with invalid user name", async () => {
    // Enter an invalid user name:
    const userName = " ";
    await signUpPopup.name.fill(userName);
    await signUpPopup.name.focus();
    await signUpPopup.name.blur();

    // Check the error messages:
    expect(signUpPopup.errorMessage.first()).toBeVisible();
    await expect(signUpPopup.errorMessage.first()).toHaveText(
      "Name is invalid"
    );
    expect(signUpPopup.errorMessage.nth(1)).toBeVisible();
    await expect(signUpPopup.errorMessage.nth(1)).toHaveText(
      "Name has to be from 2 to 20 characters long"
    );
  });

  test("checks registration form with invalid user last name", async () => {
    // Enter an invalid user last name:
    const userLastName = " ";
    await signUpPopup.lastName.fill(userLastName);
    await signUpPopup.lastName.focus();
    await signUpPopup.lastName.blur();

    // Check the error messages:
    expect(signUpPopup.errorMessage.first()).toBeVisible();
    await expect(signUpPopup.errorMessage.first()).toHaveText(
      "Last name is invalid"
    );
    expect(signUpPopup.errorMessage.nth(1)).toBeVisible();
    await expect(signUpPopup.errorMessage.nth(1)).toHaveText(
      "Last name has to be from 2 to 20 characters long"
    );
  });

  test("checks registration form with invalid email", async () => {
    // Enter an invalid email:
    const userEmail = "somename.com";
    await signUpPopup.email.fill(userEmail);
    await signUpPopup.email.focus();
    await signUpPopup.email.blur();

    // Check the error messages:
    expect(signUpPopup.errorMessage.first()).toBeVisible();
    await expect(signUpPopup.errorMessage.first()).toHaveText(
      "Email is incorrect"
    );
  });

  test("checks registration form with invalid password", async () => {
    // Enter an invalid password:
    const password = " ";
    await signUpPopup.password.fill(password);
    await signUpPopup.password.focus();
    await signUpPopup.password.blur();

    // Check the error messages:
    expect(signUpPopup.errorMessage.first()).toBeVisible();
    await expect(signUpPopup.errorMessage.first()).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );
  });

  test("checks registration form with invalid repeat password", async () => {
    // Enter an invalid repeat password:
    await signUpPopup.password.fill("123qwe123QWE");
    await signUpPopup.repeatPassword.fill("123qwe123");
    await signUpPopup.repeatPassword.focus();
    await signUpPopup.repeatPassword.blur();

    // Check the error messages:
    expect(signUpPopup.errorMessage.first()).toBeVisible();
    await expect(signUpPopup.errorMessage.first()).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );
  });
});
