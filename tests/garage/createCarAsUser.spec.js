import { expect } from "@playwright/test";
import { test } from "../../src/fixtures/fixture.js";

test.describe.only("User", () => {
  test("should be able to create a car", async ({
    userGaragePageWithStorage,
  }) => {
    const popup = await userGaragePageWithStorage.openAddCarPopup();
    await popup.fillAndSubmit("Ford", "Fiesta", 10);

    const { page } = userGaragePageWithStorage;

    await expect(page.locator("p", { hasText: `Ford Fiesta` })).toBeVisible();
  });
});
