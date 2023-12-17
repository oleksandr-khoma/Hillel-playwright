const { expect, test } = require("@playwright/test");
import { faker } from "@faker-js/faker";

test.describe("As User I should be able to register on the site", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("checks registration with valid credentials", async ({ page }) => {
    // Open sign-up form:
    const signUpButton = page.locator(".hero-descriptor button");
    await signUpButton.click();

    // Fetch all the elements:
    const signUpModal = page.locator('[role="document"]');
    const signUpName = signUpModal.locator("#signupName");
    const signUpLastName = signUpModal.locator("#signupLastName");
    const signUpEmail = signUpModal.locator("#signupEmail");
    const signUpPassword = signUpModal.locator("#signupPassword");
    const signupRepeatPassword = signUpModal.locator("#signupRepeatPassword");
    const signUpSubmit = signUpModal.getByRole("button", { name: "Register" });
    const userName = faker.person.firstName().replace("-", "");
    const userLastName = faker.person.lastName().replace("-", "");
    const userEmail = faker.internet.email();
    const password = faker.internet.password();

    // Fill in the form:
    await signUpName.fill(userName);
    await signUpLastName.fill(userLastName);
    await signUpEmail.fill(`aqa+${userEmail}`);
    await signUpPassword.fill(password);
    await signupRepeatPassword.fill(password);
    await signUpSubmit.click();

    // Delete the user:
    const settings = page.locator('[routerlink="settings"]');
    await settings.click();
    const removeAccount = page.getByRole("button", {
      name: "Remove my account",
    });
    await removeAccount.click();
    const removeModal = page.locator(".modal-content");
    const removeConfirm = removeModal.getByRole("button", {
      name: "Remove",
    });
    await removeConfirm.click();
    await signUpButton.isVisible();
  });

  test("checks registration form with invalid user name", async ({ page }) => {
    // Open sign-up form:
    const signUpButton = page.locator(".hero-descriptor button");
    await signUpButton.click();

    // Fetch all the elements:
    const signUpModal = page.locator('[role="document"]');
    const signUpName = signUpModal.locator("#signupName");
    const userName = " ";

    // Fill in the form:
    await signUpName.fill(userName);
    signUpName.focus();
    signUpName.blur();

    // Check the error messages:
    const errorMessage1 = page.locator(".invalid-feedback p").first();
    await expect(errorMessage1).toHaveText("Name is invalid");
    const errorMessage2 = page.locator(".invalid-feedback p").nth(1);
    await expect(errorMessage2).toHaveText(
      "Name has to be from 2 to 20 characters long"
    );
  });

  test("checks registration form with invalid user last name", async ({
    page,
  }) => {
    // Open sign-up form:
    const signUpButton = page.locator(".hero-descriptor button");
    await signUpButton.click();

    // Fetch all the elements:
    const signUpModal = page.locator('[role="document"]');
    const signupLastName = signUpModal.locator("#signupLastName");
    const userLastName = " ";

    // Fill in the form:
    await signupLastName.fill(userLastName);
    signupLastName.focus();
    signupLastName.blur();

    // Check the error messages:
    const errorMessage1 = page.locator(".invalid-feedback p").first();
    await expect(errorMessage1).toHaveText("Last name is invalid");
    const errorMessage2 = page.locator(".invalid-feedback p").nth(1);
    await expect(errorMessage2).toHaveText(
      "Last name has to be from 2 to 20 characters long"
    );
  });

  test("checks registration form with invalid email", async ({ page }) => {
    // Open sign-up form:
    const signUpButton = page.locator(".hero-descriptor button");
    await signUpButton.click();

    // Fetch all the elements:
    const signUpModal = page.locator('[role="document"]');
    const signUpEmail = signUpModal.locator("#signupEmail");
    const userEmail = "somename.com";

    // Fill in the form:
    await signUpEmail.fill(userEmail);
    signUpEmail.focus();
    signUpEmail.blur();

    // Check the error messages:
    const errorMessage1 = page.locator(".invalid-feedback p").first();
    await expect(errorMessage1).toHaveText("Email is incorrect");
  });

  test("checks registration form with invalid password", async ({ page }) => {
    // Open sign-up form:
    const signUpButton = page.locator(".hero-descriptor button");
    await signUpButton.click();

    // Fetch all the elements:
    const signUpModal = page.locator('[role="document"]');
    const signUpPassword = signUpModal.locator("#signupPassword");
    const password = "123";

    // Fill in the form:
    await signUpPassword.fill(password);
    signUpPassword.focus();
    signUpPassword.blur();

    // Check the error messages:
    const errorMessage1 = page.locator(".invalid-feedback p").first();
    await expect(errorMessage1).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );
  });

  test("checks registration form with invalid repeat password", async ({
    page,
  }) => {
    // Open sign-up form:
    const signUpButton = page.locator(".hero-descriptor button");
    await signUpButton.click();

    // Fetch all the elements:
    const signUpModal = page.locator('[role="document"]');
    const signUpPassword = signUpModal.locator("#signupPassword");
    const signUpRepeatPassword = signUpModal.locator("#signupRepeatPassword");
    const password = "12345678";

    // Fill in the form:
    await signUpPassword.fill(password);
    await signUpRepeatPassword.fill("12345679");

    // Check the error messages:
    const errorMessage1 = page.locator(".invalid-feedback p").first();
    await expect(errorMessage1).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );
  });
});
