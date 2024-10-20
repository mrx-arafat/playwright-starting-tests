const { test, expect } = require("@playwright/test");

test("@Web popup validation", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

  await expect(page.locator("#displayed-text")).toBeVisible();
  await page.locator("#hide-textbox").click();

  await expect(page.locator("#displayed-text")).toBeHidden();
  // await page.pause();
  page.on("dialog", (dialog) => dialog.accept());

  await page.locator("#confirmbtn").click();

  const framesPage = await page.frameLocator("#courses-iframe");

  // Inside the iframe
  await framesPage.locator("li a[href*='lifetime-access']:visible").click();

  const getTextH2 = await framesPage.locator(".content-side  h2").textContent();
  const number = getTextH2.split(" ")[1];

  console.log(number);
});
