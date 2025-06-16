import { Page, Locator, expect } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly congratsText: Locator;
  readonly logoutButton: Locator;

  // Locators as static properties for reuse
  static headingSelector = 'h1';
  static congratsSelector = 'p:has-text("Congratulations student. You successfully logged in!")';
  static logoutSelector = 'a.button';

  constructor(page: Page) {
    this.page = page;
    this.heading = page.locator(DashboardPage.headingSelector);
    this.congratsText = page.locator(DashboardPage.congratsSelector);
    this.logoutButton = page.locator(DashboardPage.logoutSelector);
  }

  async assertLoggedIn() {
    await expect(this.page).toHaveURL(/.*logged-in-successfully.*/);
    await expect(this.heading).toHaveText(/Logged In Successfully/i);
    await expect(this.congratsText).toBeVisible();
  }
} 