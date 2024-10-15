const { test, expect } = require("@playwright/test");

test("Browser Context - Validating Error Login", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill("anshika@gmail.com");
  await page.locator("#userPassword").type("Iamking@000");
  const signIn = page.locator("[value='Login']");

  await Promise.all([page.waitForNavigation(), signIn.click()]);

  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);
});
