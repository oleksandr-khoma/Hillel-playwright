import BaseComponent from "./BaseComponent";

export default class SignUpPopup extends BaseComponent {
  constructor(page) {
    super(page, page.locator('[role="document"]'));
    this.name = this.container.locator("#signupName");
    this.lastName = this.container.locator("#signupLastName");
    this.email = this.container.locator("#signupEmail");
    this.password = this.container.locator("#signupPassword");
    this.repeatPassword = this.container.locator("#signupRepeatPassword");
    this.submit = this.container.getByRole("button", {
      name: "Register",
    });
    this.errorMessage = this.container.locator(".invalid-feedback p");
  }

  async fillRegistrationForm(userName, userLastName, userEmail, password) {
    await this.name.fill(userName);
    await this.lastName.fill(userLastName);
    await this.email.fill(`aqa+${userEmail}`);
    await this.password.fill(password);
    await this.repeatPassword.fill(password);
  }
}
