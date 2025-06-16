import { test, expect } from '@playwright/test';

test.use({
  launchOptions: {
    headless: false,
  },
});

test('Login to Practice Test Automation and verify success', async ({ page }) => {
  // Go to the login page
  await page.goto('https://practicetestautomation.com/practice-test-login/');

  // Enter Username
  await page.fill('input#username', 'student');

  // Enter Password
  await page.fill('input#password', 'Password123');

  // Click Submit
  await page.click('button[id="submit"]');

  // Verify successful login by checking URL and page content
  await expect(page).toHaveURL(/.*logged-in-successfully.*/);
  await expect(page.locator('h1')).toHaveText(/Logged In Successfully/i);
  await expect(page.locator('p')).toContainText('Congratulations student. You successfully logged in!');
}); 