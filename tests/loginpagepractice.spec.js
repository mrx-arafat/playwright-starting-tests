const { test, expect } = require("@playwright/test");

test("Browser Context Playwright test", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  console.log(await page.title());

  await page.locator("#username").fill("rahulshetty");

  await page.locator('[type="password"]').fill("learning");

  await page.locator("#signInBtn").click();

  await expect(page).toHaveTitle(/Login/);
});
