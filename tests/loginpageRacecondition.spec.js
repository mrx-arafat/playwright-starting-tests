const { test, expect } = require("@playwright/test");

test("Login and Fetch Product Titles", async ({ page }) => {
  const userName = page.locator("#username");
  const signIn = page.locator("#signInBtn");
  const cardTitles = page.locator(".card-body a");

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());

  await userName.type("rahulshetty");
  await page.locator("[type='password']").type("learning");
  await signIn.click();

  console.log(await page.locator("[style*='block']").textContent());
  await expect(page.locator("[style*='block']")).toContainText("Incorrect");

  await userName.fill("");
  await userName.fill("rahulshettyacademy");

  await Promise.all([page.waitForSelector(".card-body a"), signIn.click()]);

  const titles = await cardTitles.allTextContents();
  console.log(titles);
});
