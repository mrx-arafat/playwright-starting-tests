import { test } from "@playwright/test";

test("Log in and save coffee app login state", async ({ page }) => {
  await page.goto("https://wpcafe.app/login?redirect=%2F");

  // Log in with credentials
  await page.getByPlaceholder("Email").fill("arafat@wpdeveloper.com");
  await page.getByPlaceholder("Password").fill("arafat69");
  await page.getByRole("button", { name: "Sign In" }).click();

  // Wait for the home page to load, confirming login
  await page.waitForTimeout(5000); // Adjust if necessary

  // Save the authenticated session state
  await page.context().storageState({ path: "coffee.json" });
  console.log("Login state saved to coffee.json");
});
