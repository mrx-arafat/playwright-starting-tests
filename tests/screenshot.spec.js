const { test } = require("@playwright/test");
const fs = require("fs");

test("Test case - abort image loading and take screenshots", async ({
  browser,
}) => {
  const context = await browser.newContext({ storageState: "state.json" });
  const page = await context.newPage();

  if (!fs.existsSync("screenshots")) {
    fs.mkdirSync("screenshots");
  }

  await page.route("**/*.{jpg,png,jpeg}", (route) => route.abort());

  await page.goto("https://rahulshettyacademy.com/client");

  console.log("Page loaded successfully without loading images.");

  await page.screenshot({ path: "screenshots/ss-full.png", fullPage: true });

  const firstProduct = page.locator(".card-body").first();
  await firstProduct.screenshot({ path: "screenshots/ss-product.png" });

  console.log("Screenshots taken successfully.");
});
