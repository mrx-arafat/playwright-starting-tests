const { test, expect } = require("@playwright/test");
const path = require("path"); // Path module for handling file paths

test("Full E-commerce Flow", async ({ page }) => {
  // 1. Login
  await page.goto("https://automationexercise.com/login");
  await page.fill("[data-qa='login-email']", "rafi@test.com");
  await page.fill("[data-qa='login-password']", "rafi@1234");
  await Promise.all([
    page.waitForNavigation(),
    page.getByRole("button", { name: "Login" }).click(),
  ]);
  await page.waitForLoadState("networkidle");

  // 2. Navigate to Men > Jeans category
  await page.getByRole("heading", { name: " Men" }).click();
  await page.getByRole("link", { name: " Men" }).click();
  await page.getByRole("link", { name: "Jeans" }).click();

  // 3. Select a product and add to cart
  await page.getByRole("link", { name: " View Product" }).nth(1).click();
  await page.locator("#quantity").fill("2");
  await page.getByRole("button", { name: " Add to cart" }).click();

  await page.getByRole("link", { name: "View Cart" }).click();
  await page.waitForLoadState("networkidle");

  // 4. Proceed to checkout and place order
  await page.getByText("Proceed To Checkout").click();
  await page.waitForLoadState("networkidle");

  await page.getByRole("link", { name: "Place Order" }).click();

  // 5. Fill payment details
  await page.locator('input[name="name_on_card"]').fill("Rafi");
  await page.locator('input[name="card_number"]').fill("4242424242424242");
  await page.getByPlaceholder("ex.").fill("311");
  await page.getByPlaceholder("MM").fill("09");
  await page.getByPlaceholder("YYYY").fill("2029");
  await page.getByRole("button", { name: "Pay and Confirm Order" }).click();
  await page.waitForLoadState("networkidle");

  // 6. Download invoice
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("link", { name: "Download Invoice" }).click();
  await page.waitForLoadState("networkidle");

  const download = await downloadPromise;
  console.log(`Invoice downloaded to: ${download.suggestedFilename()}`);

  // 7. Contact Us Form
  await page.getByRole("link", { name: " Contact us" }).click();
  await page.waitForLoadState("networkidle");

  await page.getByPlaceholder("Name").fill("rafi");
  await page.getByPlaceholder("Email", { exact: true }).fill("rafi@test.com");
  await page.getByPlaceholder("Subject").fill("TEST");
  await page.getByPlaceholder("Your Message Here").fill("this is a dummy msg");

  // 8. Upload a file (sitelist.txt must be in the same directory as the test script)
  const filePath = path.join(__dirname, "sitelist.txt");
  await page.locator('input[name="upload_file"]').setInputFiles(filePath);

  // Handle dialog alert (if any)
  page.once("dialog", (dialog) => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });

  // 9. Submit the contact form

  await page.getByRole("button", { name: "Submit" }).click();
});
