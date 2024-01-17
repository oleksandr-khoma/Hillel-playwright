import { USERS } from "../../../../src/data/users.js";
import { expect, test } from "@playwright/test";
import { negativeFixtures } from "./fixtures/postCars.fixtures.js";
import APIClient from "../../../../src/client/APIClient.js";

test.describe("Cars", () => {
  test.describe("Post", () => {
    test.describe("Positive case (Use header)", () => {
      let client;
      let brands;

      test.beforeAll(async () => {
        client = await APIClient.authenticate(
          USERS.KHOMA.email,
          USERS.KHOMA.password
        );

        // GET /cars/brands
        const response = await client.carController.getBrands();
        brands = response.data.data;
      });

      test.afterAll(async () => {
        // GET /cars
        const userCars = await client.carController.getUserCars();
        await Promise.all(
          userCars.data.data.map((car) =>
            // DELETE /cars/{id}
            client.carController.deleteCarById(car.id)
          )
        );
      });

      test("Create car", async () => {
        for (const brand of brands) {
          await test.step(`Create car brand ${brand.title}`, async () => {
            // GET /cars/models/{id}
            const modelsResponse =
              await client.carController.getModelsByBrandId(brand.id);
            const models = modelsResponse.data.data;

            for (const model of models) {
              await test.step(`Model : ${model.title}`, async () => {
                const createCarReqBody = {
                  carBrandId: brand.id,
                  carModelId: model.id,
                  mileage: Math.floor(Math.random() * 100),
                };

                // POST /cars
                const createCarResponse = await client.carController.createCar(
                  createCarReqBody
                );
                expect(
                  createCarResponse.status,
                  "Status code should be valid"
                ).toBe(201);
                expect(createCarResponse.data.data.carBrandId).toBe(brand.id);
                expect(createCarResponse.data.data.carModelId).toBe(model.id);
              });
            }
          });
        }
      });
    });
  });
});

test.describe("Cars", () => {
  test.describe("Create", () => {
    test.describe("Negative cases", () => {
      let client;

      test.beforeAll(async () => {
        client = await APIClient.authenticate(
          USERS.KHOMA.email,
          USERS.KHOMA.password
        );
      });

      for (const { title, inputData, expectedData } of negativeFixtures) {
        test(title, async () => {
          const createCarResponse = await client.carController.createCar(
            inputData
          );
          expect(createCarResponse.status, "Status code should be valid").toBe(
            expectedData.statusCode
          );
          expect(
            createCarResponse.data,
            "Response body should be valid"
          ).toEqual(expectedData.data);
        });
      }
    });
  });
});
