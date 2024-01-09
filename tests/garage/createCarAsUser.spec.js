import { expect, request } from "@playwright/test";
import { test } from "../../src/fixtures/fixture.js";

test.describe("User", () => {
  test("should be able to create a car", async ({
    userGaragePageWithStorage,
  }) => {
    const popup = await userGaragePageWithStorage.openAddCarPopup();
    await popup.fillAndSubmit("Ford", "Fiesta", 10);

    const { page } = userGaragePageWithStorage;

    await expect(page.locator("p", { hasText: `Ford Fiesta` })).toBeVisible();
  });

  test("should be able to create a car via API", async ({ apiClient }) => {
    const requestBody = {
      carBrandId: 3,
      carModelId: 12,
      mileage: 12,
    };
    const addCar = await apiClient.post("/api/cars", { data: requestBody });
    const body = await addCar.json();
    expect(body.status).toBe("ok");
    expect(body.data.carBrandId).toBe(requestBody.carBrandId);
    expect(body.data.carModelId).toBe(requestBody.carModelId);
    expect(body.data.mileage).toBe(requestBody.mileage);
  });

  test("should return an error while sending API request with invalid body", async ({
    apiClient,
  }) => {
    const requestBody = {
      carBrandId: 3000,
      carModelId: 12,
      mileage: 12,
    };
    const addCar = await apiClient.post("/api/cars", { data: requestBody });
    const body = await addCar.json();
    expect(body.status).toBe("error");
    expect(body.message).toBe("Brand not found");
  });

  test("should return an error while sending API request with invalid route", async ({
    apiClient,
  }) => {
    const requestBody = {
      carBrandId: 3,
      carModelId: 12,
      mileage: 12,
    };
    const addCar = await apiClient.post("/api/cars/ford", {
      data: requestBody,
    });
    const body = await addCar.json();
    expect(body.status).toBe("error");
    expect(body.message).toBe("Not found");
  });
});
