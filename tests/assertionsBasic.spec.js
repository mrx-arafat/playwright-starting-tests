const { test, expect } = require("@playwright/test");

test("open page using browser", async ({ browser }) => {
  const context = await browser.newContext();

  const page = await context.newPage();
  await page.goto("https://google.com");
});

test("open direct page without browser mention", async ({ page }) => {
  await page.goto("https://bing.com");

  console.log(await page.title());

  await expect(page).toHaveTitle("Bing");
});
