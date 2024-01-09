import BasePage from "./BasePage";
import AddCarPopup from "../components/AddCarPopup";

export default class GaragePage extends BasePage {
  constructor(page) {
    super(page);
    this.settings = page.locator('[routerlink="settings"]');
    this.addCarButton = this.page.locator("button", { hasText: "Add car" });
  }

  async openSettings() {
    await this.settings.click();
  }

  async openAddCarPopup() {
    await this.addCarButton.click();
    return new AddCarPopup(this.page);
  }
}
