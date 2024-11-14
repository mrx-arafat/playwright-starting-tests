const { test, expect } = require("@playwright/test");

let webContext;

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://rahulshettyacademy.com/client");

  await page.locator("#userEmail").fill("anshika@gmail.com");
  await page.locator("#userPassword").type("Iamking@000");
  await page.locator("[value='Login']").click();

  await page.waitForLoadState("networkidle");

  await context.storageState({ path: "state.json" });

  webContext = await browser.newContext({ storageState: "state.json" });
  await page.close();
});

test("Client App login", async ({ browser }) => {
  const context = await browser.newContext({ storageState: "state.json" });
  const page = await context.newPage();

  await page.goto("https://rahulshettyacademy.com/client");

  await page.waitForLoadState("networkidle");

  console.log("Client app loaded successfully after login.");
});

test("Test case 2", async ({ browser }) => {
  const email = "";
  const productName = "ZARA COAT 3";

  const webContext = await browser.newContext({ storageState: "state.json" });
  const page = await webContext.newPage();

  await page.goto("https://rahulshettyacademy.com/client");

  const products = page.locator(".card-body");

  const titles = await page.locator(".card-body b").allTextContents();

  console.log(titles);

  const matchingProduct = titles.find((title) => title.includes(productName));
  console.log(`Found matching product: ${matchingProduct}`);
});

