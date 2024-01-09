import { test } from "../../src/fixtures/fixture.js";
import { expect } from "@playwright/test";
import GaragePage from "../../pageobjects/GaragePage.js";

test.describe("User", () => {
  test("should check modified responnse info", async ({
    userGaragePageWithStorage,
  }) => {
    const { page } = userGaragePageWithStorage;
    const garagePage = new GaragePage(page);

    const fakeBody = {
      status: "ok",
      data: {
        userId: 56761,
        photoFilename: "default-user.png",
        name: "Artur",
        lastName: "Khomenko",
      },
    };

    await page.route("/api/users/profile", async (route) => {
      await route.fulfill({
        body: JSON.stringify(fakeBody),
      });
    });

    await garagePage.openProfile();
    await expect(
      page.locator("p", { hasText: `${fakeBody.data.name}` })
    ).toBeVisible();
  });
});
