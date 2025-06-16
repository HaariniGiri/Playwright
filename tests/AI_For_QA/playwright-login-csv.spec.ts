// This script requires Node.js and Playwright. For type support, run: npm i --save-dev @types/node
import { test, expect } from '@playwright/test';
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

test.use({
  headless: false,
});

test('Login using credentials from CSV (S.no 2)', async ({ page }) => {
  await page.goto('https://practicetestautomation.com/practice-test-login/');
  await page.fill('input#username', username);
  await page.fill('input#password', password);
  await page.click('button[id="submit"]');
  await expect(page).toHaveURL(/.*logged-in-successfully.*/);
  await expect(page.locator('h1')).toHaveText(/Logged In Successfully/i);
  await expect(page.locator('p:has-text("Congratulations")')).toBeVisible();
}); 