const { test, expect } = require("@playwright/test");

test("Browser Context Playwright test", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/", {
    waitUntil: "domcontentloaded",
  });

  console.log(await page.title());

  await page.locator("#username").fill("rahulshettyacademy");
  await page.locator("#password").fill("learning");

  await page.locator("#signInBtn").click();

  await page.waitForSelector(".card-body a");

  const isErrorVisible = await page.locator("[style*='block']").isVisible();

  if (isErrorVisible) {
    const errorMessage = await page.locator("[style*='block']").textContent();
    console.log(`Login error message: ${errorMessage}`);
  } else {
    console.log("Login successful.");

    const firstCardText = await page
      .locator(".card-body a")
      .nth(0)
      .textContent();
    console.log(`First Card text: ${firstCardText}`);

    const allProductsText = await page
      .locator(".card-body a")
      .allTextContents();

    console.log("All products:");
    allProductsText.forEach((productText, index) => {
      console.log(`Product ${index + 1}: ${productText}`);
    });

    expect(allProductsText.length).toBeGreaterThan(0);
  }
});
