import { USERS } from "../../../../src/data/users.js";
import { expect, test } from "@playwright/test";
import APIClient from "../../../../src/client/APIClient.js";

test.describe("Cars", () => {
  test.describe("Delete", () => {
    let client;
    let brands;
    let carId;

    test.beforeAll(async () => {
      client = await APIClient.authenticate(
        USERS.KHOMA.email,
        USERS.KHOMA.password
      );
      const response = await client.carController.getBrands();
      brands = response.data.data;
      const modelsResponse = await client.carController.getModelsByBrandId(
        brands[0].id
      );
      const models = modelsResponse.data.data;
      const createCarReqBody = {
        carBrandId: brands[0].id,
        carModelId: models[0].id,
        mileage: Math.floor(Math.random() * 100),
      };
      const createCarResponse = await client.carController.createCar(
        createCarReqBody
      );
      expect(createCarResponse.status, "Status code should be valid").toBe(201);
      carId = createCarResponse.data.data.id;
    });

    test.afterAll(async () => {
      const userCars = await client.carController.getUserCars();
      await Promise.all(
        userCars.data.data.map((car) =>
          client.carController.deleteCarById(car.id)
        )
      );
    });

    test("Deletes existing car", async () => {
      const response = await client.carController.deleteCarById(carId);
      expect(response.status, "Status should be valid").toBe(200);
      expect(response.data.data.carId).toEqual(carId);
    });
  });
});
