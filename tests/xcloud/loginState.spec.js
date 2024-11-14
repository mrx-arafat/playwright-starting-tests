import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

test("Generate xCloud login state", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://staging.tmp1.dev/login");
  await page.getByPlaceholder("Email Address..").click();
  await page
    .getByPlaceholder("Email Address..")
    .fill(process.env.XCLOUD_STAGING_EMAIL);
  await page.getByPlaceholder("********").click();
  await page
    .getByPlaceholder("********")
    .fill(process.env.XCLOUD_STAGING_PASSWORD);
  await page.locator("span").filter({ hasText: "Remember me" }).first().click();
  await page.getByRole("button", { name: "Log In" }).click();

  await page.waitForLoadState("networkidle");

  const storageFilePath = path.join(__dirname, "loginState/loginState.json");
  await context.storageState({ path: storageFilePath });

  await page.close();
  await context.close();
});

test("xCloud Client App login verification", async ({ browser }) => {
  const context = await browser.newContext({
    storageState: "./tests/xcloud/loginState/loginState.json",
  });
  const page = await context.newPage();

  await page.goto("https://staging.tmp1.dev/dashboard");
  await page.waitForLoadState("networkidle");

  console.log("xCloud Dashboard loaded successfully after login.");
});
