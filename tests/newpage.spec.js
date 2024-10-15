const { test, expect } = require("@playwright/test");

test.only("Child windows handle with text extraction", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  const documentLink = page.locator("[href*='documents-request']");

  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    documentLink.click(),
  ]);

  const text = await newPage.locator(".red").textContent();

  const arrayText = text.split("@");
  const domain = arrayText[1].split(" ")[0];

  console.log(domain);

  await page.locator("#username").type(domain);

  await page.pause();

  console.log(await page.locator("#username").textContent());
});
