const { test, expect } = require("@playwright/test");

test("Browser Context Playwright test", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/", {
    waitUntil: "domcontentloaded",
  });

  console.log(await page.title());

  await page.locator("#username").fill("rahulshetty");

  await page.locator("#password").fill("learning");

  await page.locator("#signInBtn").click();

  const errorMessage = await page.locator("[style*='block']").textContent();

  if (errorMessage) {
    console.log(`Login error message: ${errorMessage}`);
  } else {
    console.log("Login successful.");
  }

  await expect(page.locator("[style*='block']")).not.toBeVisible();
});
