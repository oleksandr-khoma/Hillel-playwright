import BaseComponent from "./BaseComponent";

export default class RemoveAccountPopup extends BaseComponent {
  constructor(page) {
    super(page, page.locator(".modal-content"));
    this.confirmBtn = this.container.getByRole("button", {
      name: "Remove",
    });
  }

  async confirmRemoveAccount() {
    await this.confirmBtn.click();
  }
}
