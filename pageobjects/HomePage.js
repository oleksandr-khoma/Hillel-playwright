import BasePage from "./BasePage";

export default class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.signUpButton = page.locator(".hero-descriptor button");
  }
}
