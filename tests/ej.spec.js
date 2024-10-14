import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test("open page using browser", async ({ page }) => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email = faker.internet.email();
  const password = "Abcd@1234";

  console.log(`Generated User Details: 
    First Name: ${firstName}, 
    Last Name: ${lastName}, 
    Email: ${email}, 
    Password: ${password}`);

  await page.goto("https://app.easy.jobs/registration");

  console.log(await page.title());

  await page.locator("input[placeholder='Enter first name']").type(firstName);
  await page.locator("input[placeholder='Enter last name']").type(lastName);
  await page.locator("input[placeholder='youremail@gmail.com']").type(email);
  await page.locator("input[placeholder='Password']").type(password);
  await page.locator("input[placeholder='Re-Type Password']").type(password);

  await page.locator("button[type='submit']").click();

  await page.waitForURL("https://app.easy.jobs/subscribe?plan=free");

  await page.locator("button[type='submit']").click();

  await page.waitForNavigation();

  const companyName = faker.company.name();
  const username = faker.internet.userName();
  const phoneNumber = faker.phone.number();

  console.log(`Generated Company Details: 
    Company Name: ${companyName}, 
    Username: ${username}, 
    Phone Number: ${phoneNumber}`);

  await page.locator("#company-name").fill(companyName);
  await page.locator("#username").fill(username);
  await page.locator("#phone-no").fill(phoneNumber);

  await page.locator(".multiselect__tags").click();

  await page.locator("div.col-md-6.login-content li:nth-child(11)").click();

  const website = faker.internet.url();
  await page.locator("#website").fill(website);

  await page.locator("label[class='checkbox mt-3'] span").click();

  await page.locator("button[type='submit']").click();

  await page.waitForTimeout(3000000);
});
