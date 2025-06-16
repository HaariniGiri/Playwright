# Test info

- Name: Login using POM and CSV credentials, referencing locators and credentials from POM
- Location: D:\Playwright\tests\AI_For_QA\login-pom.spec.ts:29:5

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toHaveText(expected)

Locator: locator('a.button')
Expected string: "Log out"
Received: <element(s) not found>
Call log:
  - expect.toHaveText with timeout 5000ms
  - waiting for locator('a.button')

    at D:\Playwright\tests\AI_For_QA\login-pom.spec.ts:40:60
```

# Page snapshot

```yaml
- link "Press \"Enter\" to skip to content":
  - /url: "#main-container"
- banner:
  - navigation
  - link "Practice Test Automation":
    - /url: https://practicetestautomation.com/
    - img "Practice Test Automation"
  - navigation:
    - navigation:
      - list:
        - listitem:
          - link "Home":
            - /url: https://practicetestautomation.com/
        - listitem:
          - link "Practice":
            - /url: https://practicetestautomation.com/practice/
        - listitem:
          - link "Courses":
            - /url: https://practicetestautomation.com/courses/
        - listitem:
          - link "Blog":
            - /url: https://practicetestautomation.com/blog/
        - listitem:
          - link "Contact":
            - /url: https://practicetestautomation.com/contact/
- main:
  - article:
    - heading "Logged In Successfully" [level=1]
    - paragraph:
      - strong: Congratulations student. You successfully logged in!
    - link "Log out":
      - /url: https://practicetestautomation.com/practice-test-login/
    - paragraph
- contentinfo:
  - text: © Copyright 2020
  - link "Practice Test Automation.":
    - /url: https://practicetestautomation.com/
  - text: All rights reserved |
  - link "Privacy Policy":
    - /url: https://practicetestautomation.com/privacy-policy/
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 | import { LoginPage } from './pages/LoginPage';
   3 | import { DashboardPage } from './pages/DashboardPage';
   4 | const fs = require('fs');
   5 | const path = require('path');
   6 |
   7 | // Read CSV and extract S.no 2 credentials
   8 | const csvPath = path.join(process.cwd(), 'node_modules/playwright/Username and Password - Sheet1.csv');
   9 | const csv = fs.readFileSync(csvPath, 'utf-8').split('\n');
  10 |
  11 | let username = '';
  12 | let password = '';
  13 | for (let i = 0; i < csv.length; i++) {
  14 |   if (csv[i].startsWith('2,username:')) {
  15 |     username = csv[i].split(',')[2].trim();
  16 |     if (csv[i+1] && csv[i+1].includes('password:')) {
  17 |       password = csv[i+1].split(',')[2].trim();
  18 |     }
  19 |     break;
  20 |   }
  21 | }
  22 |
  23 | // Set credentials in the POM
  24 | LoginPage.username = username;
  25 | LoginPage.password = password;
  26 |
  27 | test.use({ headless: false });
  28 |
  29 | test('Login using POM and CSV credentials, referencing locators and credentials from POM', async ({ page }) => {
  30 |   const loginPage = new LoginPage(page);
  31 |   const dashboardPage = new DashboardPage(page);
  32 |
  33 |   await loginPage.goto();
  34 |   // Use static credentials from POM
  35 |   await loginPage.loginWithStaticCredentials();
  36 |
  37 |   // Use locators from POM for additional checks
  38 |   await expect(page.locator(DashboardPage.headingSelector)).toHaveText(/Logged In Successfully/i);
  39 |   await expect(page.locator(DashboardPage.congratsSelector)).toBeVisible();
> 40 |   await expect(page.locator(DashboardPage.logoutSelector)).toHaveText('Log out');
     |                                                            ^ Error: Timed out 5000ms waiting for expect(locator).toHaveText(expected)
  41 | }); 
```