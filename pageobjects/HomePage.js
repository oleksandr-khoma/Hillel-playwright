import BasePage from "./BasePage";
import SignInPopup from "../components/SignInPopup.js";
import GaragePage from "./GaragePage.js";

export default class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.signUpButton = page.locator(".hero-descriptor button");
    this.signInButton = page.locator(".header_signin");
    this.guestLoginButton = page.locator("button.-guest");
  }

  async clickSignInButtonAndOpenPopup() {
    await this.signInButton.click();
    const popup = new SignInPopup(this.page);
    return popup;
  }

  async loginAsGuest() {
    await this.header.guestLoginButton.click();
    return new GaragePage(this._page);
  }
}
