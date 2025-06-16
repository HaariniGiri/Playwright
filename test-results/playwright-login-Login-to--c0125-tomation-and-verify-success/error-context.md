# Test info

- Name: Login to Practice Test Automation and verify success
- Location: D:\Playwright\tests\AI_For_QA\playwright-login.spec.ts:9:5

# Error details

```
Error: expect.toContainText: Error: strict mode violation: locator('p') resolved to 2 elements:
    1) <p class="has-text-align-center">…</p> aka getByRole('paragraph').filter({ hasText: 'Congratulations student. You' })
    2) <p></p> aka getByRole('paragraph').filter({ hasText: /^$/ })

Call log:
  - expect.toContainText with timeout 5000ms
  - waiting for locator('p')

    at D:\Playwright\tests\AI_For_QA\playwright-login.spec.ts:25:35
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
   2 |
   3 | test.use({
   4 |   launchOptions: {
   5 |     headless: false,
   6 |   },
   7 | });
   8 |
   9 | test('Login to Practice Test Automation and verify success', async ({ page }) => {
  10 |   // Go to the login page
  11 |   await page.goto('https://practicetestautomation.com/practice-test-login/');
  12 |
  13 |   // Enter Username
  14 |   await page.fill('input#username', 'student');
  15 |
  16 |   // Enter Password
  17 |   await page.fill('input#password', 'Password123');
  18 |
  19 |   // Click Submit
  20 |   await page.click('button[id="submit"]');
  21 |
  22 |   // Verify successful login by checking URL and page content
  23 |   await expect(page).toHaveURL(/.*logged-in-successfully.*/);
  24 |   await expect(page.locator('h1')).toHaveText(/Logged In Successfully/i);
> 25 |   await expect(page.locator('p')).toContainText('Congratulations student. You successfully logged in!');
     |                                   ^ Error: expect.toContainText: Error: strict mode violation: locator('p') resolved to 2 elements:
  26 |   await expect(page.locator('a.button')).toHaveText('Log out');
  27 | }); 
```