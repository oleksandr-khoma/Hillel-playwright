import Cabinet from "./GaragePage";

export default class SettingsPage extends Cabinet {
  constructor(page) {
    super(page);
    this.removeAccountButton = page.getByRole("button", {
      name: "Remove my account",
    });
  }

  async openRemoveAccountModal() {
    await this.removeAccountButton.click();
  }
}
