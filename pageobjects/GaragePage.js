import BasePage from "./BasePage";

export default class GaragePage extends BasePage {
  constructor(page) {
    super(page);
    this.settings = page.locator('[routerlink="settings"]');
  }

  async openSettings() {
    await this.settings.click();
  }
}
