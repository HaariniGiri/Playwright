import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
const fs = require('fs');
const path = require('path');

// Read CSV and extract S.no 2 credentials
const csvPath = path.join(process.cwd(), 'node_modules/playwright/Username and Password - Sheet1.csv');
const csv = fs.readFileSync(csvPath, 'utf-8').split('\n');

let username = '';
let password = '';
for (let i = 0; i < csv.length; i++) {
  if (csv[i].startsWith('2,username:')) {
    username = csv[i].split(',')[2].trim();
    if (csv[i+1] && csv[i+1].includes('password:')) {
      password = csv[i+1].split(',')[2].trim();
    }
    break;
  }
}

// Set credentials in the POM
LoginPage.username = username;
LoginPage.password = password;

test.use({ headless: false });

test('Login using POM and CSV credentials, referencing locators and credentials from POM', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await loginPage.goto();
  // Use static credentials from POM
  await loginPage.loginWithStaticCredentials();

  // Use locators from POM for additional checks
  await expect(page.locator(DashboardPage.headingSelector)).toHaveText(/Logged In Successfully/i);
  await expect(page.locator(DashboardPage.congratsSelector)).toBeVisible();
}); 