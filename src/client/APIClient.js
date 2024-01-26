import CarController from "../controllers/CarController.js";
import AuthController from "../controllers/AuthController.js";
import { CookieJar } from "tough-cookie";
import { expect } from "@playwright/test";

export default class APIClient {
  constructor(jar) {
    this.authController = new AuthController(jar);
    this.carController = new CarController(jar);
  }

  static async authenticate(email, password) {
    const jar = new CookieJar();
    const authController = new AuthController(jar);
    const res = await authController.login({
      email: email,
      password: password,
      remember: false,
    });
    expect(res.status).toBe(200);

    return new APIClient(jar);
  }
}
