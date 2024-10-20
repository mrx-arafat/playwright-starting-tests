const { test, expect } = require("@playwright/test");

test.describe("Visual Regression Tests", () => {
  test("Visual comparison of Google landing page", async ({ page }) => {
    await page.goto("https://google.com/");

    expect(await page.screenshot()).toMatchSnapshot("google-landing.png");
  });

  test("Visual comparison of a specific element", async ({ page }) => {
    await page.goto("https://google.com/");

    const logo = await page.locator('img[alt="Google"]');

    expect(await logo.screenshot()).toMatchSnapshot("google-logo.png");
  });
});
