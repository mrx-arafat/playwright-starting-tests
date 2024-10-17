const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pageobjects/LoginPage");

test.describe("Client App Test Suite", () => {
  test.beforeEach(async ({ page }) => {
    page.on("request", (request) => {
      console.log("Request:", request.url());
    });

    page.on("response", (response) => {
      console.log("Response:", response.url(), "Status:", response.status());
    });

    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.validLogin("anshika@gmail.com", "Iamking@000");

    await page.waitForLoadState("networkidle");
    console.log("Login successful and page loaded.");
  });

  test("Client App login and verify loaded state", async ({ page }) => {
    console.log("Client app is loaded successfully after login.");
  });

  test("Fetch Product Titles and Add Matching Product to Cart", async ({
    page,
  }) => {
    const productName = "ZARA COAT 3";

    const products = page.locator(".card-body");
    const titles = await page.locator(".card-body b").allTextContents();

    console.log("Product titles:", titles);

    const matchingProduct = titles.find((title) => title.includes(productName));
    console.log(`Found matching product: ${matchingProduct}`);

    if (matchingProduct) {
      const count = await products.count();
      for (let i = 0; i < count; i++) {
        const productTitle = await products.nth(i).locator("b").textContent();
        if (productTitle === productName) {
          await products.nth(i).locator("text=Add To Cart").click();
          console.log(`Added ${productName} to the cart.`);
          break;
        }
      }
    } else {
      console.log(`Product ${productName} not found.`);
    }
  });
});
