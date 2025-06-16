import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  // Store credentials as static properties (can be loaded from CSV or env)
  static username: string = '';
  static password: string = '';

  // Locators as static properties for reuse
  static usernameSelector = 'input#username';
  static passwordSelector = 'input#password';
  static submitSelector = 'button[id="submit"]';

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator(LoginPage.usernameSelector);
    this.passwordInput = page.locator(LoginPage.passwordSelector);
    this.submitButton = page.locator(LoginPage.submitSelector);
  }

  async goto() {
    await this.page.goto('https://practicetestautomation.com/practice-test-login/');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async loginWithStaticCredentials() {
    await this.login(LoginPage.username, LoginPage.password);
  }

  async assertLoginError() {
    await expect(this.page.locator('div#error')).toBeVisible();
  }
} 