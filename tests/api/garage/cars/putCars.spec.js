import { USERS } from "../../../../src/data/users.js";
import { expect, test } from "@playwright/test";
import APIClient from "../../../../src/client/APIClient.js";

test.describe("Cars", () => {
  test.describe("Put", () => {
    let client;
    let brands;
    let models;
    let carId;
    let mileage;

    test.beforeAll(async () => {
      client = await APIClient.authenticate(
        USERS.KHOMA1.email,
        USERS.KHOMA1.password
      );
      const response = await client.carController.getBrands();
      brands = response.data.data;
      const modelsResponse = await client.carController.getModelsByBrandId(
        brands[0].id
      );
      models = modelsResponse.data.data;
      mileage = Math.floor(Math.random() * 100);
      const createCarReqBody = {
        carBrandId: brands[0].id,
        carModelId: models[0].id,
        mileage,
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

    test("Put data for existing car", async () => {
      const carBrandId = await brands[1].id;
      const carBrantTitle = await brands[1].title;
      const carModelId = await models[1].id;
      const carModelTitle = await models[1].title;
      const updateCarReqBody = {
        carBrandId,
        carModelId,
        mileage,
      };
      const response = await client.carController.putCarById(
        carId,
        updateCarReqBody
      );
      console.log(response);
      expect(response.status, "Status should be valid").toBe(200);
      expect(response.data.data.id).toEqual(carId);
      expect(response.data.data.carBrandId).toEqual(carBrandId);
      expect(response.data.data.carModelId).toEqual(carModelId);
      expect(response.data.data.brand).toEqual(carBrantTitle);
      expect(response.data.data.model).toEqual(carModelTitle);
    });
  });
});
