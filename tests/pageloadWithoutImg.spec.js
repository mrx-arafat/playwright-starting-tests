const { test } = require("@playwright/test");

test("Test case - abort image loading", async ({ browser }) => {
  const context = await browser.newContext({ storageState: "state.json" });
  const page = await context.newPage();

  await page.route("**/*.{jpg,png,jpeg}", (route) => route.abort());

  await page.goto("https://rahulshettyacademy.com/client");

  console.log("Page loaded successfully without loading images.");
});
