import { USERS } from "../../../../src/data/users.js";
import { expect, test } from "@playwright/test";
import APIClient from "../../../../src/client/APIClient.js";

test.describe("Cars", () => {
  test.describe("Get", () => {
    let client;
    let brands;
    let models;
    let carId;
    let carBrandId;
    let carBrantTitle;
    let carModelId;
    let carModelTitle;
    let mileage;

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
      models = modelsResponse.data.data;
      carBrandId = brands[0].id;
      carBrantTitle = brands[0].title;
      carModelId = models[0].id;
      carModelTitle = models[0].title;
      mileage = Math.floor(Math.random() * 100);
      const createCarReqBody = {
        carBrandId,
        carModelId,
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

    test("Get cars brands", async () => {
      const response = await client.carController.getBrands();
      expect(response.status, "Status code should be valid").toBe(200);
      expect(response.data.data.length).toBeGreaterThan(0);
      expect(response.data.data[0].title).toEqual("Audi");
      expect(response.data.data[0].logoFilename).toEqual("audi.png");
      expect(response.data.data[1].title).toEqual("BMW");
      expect(response.data.data[1].logoFilename).toEqual("bmw.png");
      expect(response.data.data[2].title).toEqual("Ford");
      expect(response.data.data[2].logoFilename).toEqual("ford.png");
      expect(response.data.data[3].title).toEqual("Porsche");
      expect(response.data.data[3].logoFilename).toEqual("porsche.png");
      expect(response.data.data[4].title).toEqual("Fiat");
      expect(response.data.data[4].logoFilename).toEqual("fiat.png");
    });

    test("Get car brand by id", async () => {
      const response = await client.carController.getBrandsById("1");
      expect(response.status, "Status code should be valid").toBe(200);
      expect(response.data.data.title).toEqual("Audi");
      expect(response.data.data.logoFilename).toEqual("audi.png");
    });

    test("Get cars models", async () => {
      const response = await client.carController.getModels();
      expect(response.status, "Status code should be valid").toBe(200);
      expect(response.data.data.length).toBeGreaterThan(0);
      expect(response.data.data[0].title).toEqual("TT");
      expect(response.data.data[5].title).toEqual("3");
      expect(response.data.data[10].title).toEqual("Fiesta");
      expect(response.data.data[15].title).toEqual("911");
      expect(response.data.data[18].title).toEqual("Palio");
    });

    test("Get car models by id", async () => {
      const response = await client.carController.getModelsByBrandId(
        brands[0].id
      );
      expect(response.status, "Status code should be valid").toBe(200);
      expect(response.data.data.length).toBeGreaterThan(0);
      expect(response.data.data[0].carBrandId).toEqual(carBrandId);
      expect(response.data.data[0].title).toEqual("TT");
      expect(response.data.data[1].title).toEqual("R8");
      expect(response.data.data[2].title).toEqual("Q7");
      expect(response.data.data[3].title).toEqual("A6");
      expect(response.data.data[4].title).toEqual("A8");
    });

    test("Get user cars", async () => {
      const response = await client.carController.getUserCars();
      expect(response.status, "Status code should be valid").toBe(200);
      expect(response.data.data.length).toBeGreaterThan(0);
      expect(response.data.data[0].id).toEqual(carId);
      expect(response.data.data[0].carBrandId).toEqual(carBrandId);
      expect(response.data.data[0].carModelId).toEqual(carModelId);
      expect(response.data.data[0].initialMileage).toEqual(mileage);
      expect(response.data.data[0].mileage).toEqual(mileage);
      expect(response.data.data[0].brand).toEqual(carBrantTitle);
      expect(response.data.data[0].model).toEqual(carModelTitle);
    });

    test("Get user cars by id", async () => {
      const response = await client.carController.getUserCarsById(carId);
      expect(response.status, "Status code should be valid").toBe(200);
      expect(response.data.data.id).toEqual(carId);
      expect(response.data.data.carBrandId).toEqual(carBrandId);
      expect(response.data.data.carModelId).toEqual(carModelId);
      expect(response.data.data.initialMileage).toEqual(mileage);
      expect(response.data.data.mileage).toEqual(mileage);
      expect(response.data.data.brand).toEqual(carBrantTitle);
      expect(response.data.data.model).toEqual(carModelTitle);
    });
  });
});
