const { test, expect, request } = require("@playwright/test");

const loginPayload = {
  userEmail: "anshika@gmail.com",
  userPassword: "Iamking@000",
};

let token;

test.beforeAll(async () => {
  const apiContext = await request.newContext();

  const loginResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
    {
      data: loginPayload,
    }
  );

  expect(loginResponse.ok()).toBeTruthy();

  const loginResponseJson = await loginResponse.json();
  token = loginResponseJson.token;

  console.log("Token:", token);
});

test("@API Browser Context - Validating Error Login", async ({ page }) => {
  await page.addInitScript((token) => {
    window.localStorage.setItem("token", token);
  }, token);

  await page.goto("https://rahulshettyacademy.com/client");

  await page.waitForLoadState("networkidle");

  const titles = await page.locator(".card-body b").allTextContents();

  console.log(titles);
});
