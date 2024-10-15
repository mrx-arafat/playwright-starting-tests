import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://app.easy.jobs/login");
  await page.locator(".col-md-6").first().click();
  await page.getByPlaceholder("youremail@gmail.com").click();
  await page
    .getByPlaceholder("youremail@gmail.com")
    .fill("e4rafat+test1@gmail.com");

  await page.getByPlaceholder("youremail@gmail.com").click();

  await page.getByPlaceholder("Enter password").click();
  await page.getByPlaceholder("Enter password").fill("e4rafat+test1");
  await page.getByRole("button", { name: "Sign In", exact: true }).click();
  await page.getByRole("link", { name: " Jobs" }).click();
  await page.getByRole("link", { name: " Create a job post" }).click();
  await page.getByPlaceholder("Enter  job title").click();
  await page.getByPlaceholder("Enter  job title").fill("mara khau jobs");
  await page.getByRole("textbox", { name: "Rich Text Editor, main" }).click();
  await page
    .getByRole("textbox", { name: "Rich Text Editor, main" })
    .fill("this is a title of des");

  await page.getByPlaceholder("No of Vacancies").click();
  await page.getByPlaceholder("No of Vacancies").fill("1");
  await page.getByPlaceholder("No of Vacancies").click();
  await page.getByPlaceholder("No of Vacancies").fill("3");
  await page.locator(".multiselect__select").first().click();
  await page.locator("span").filter({ hasText: "On-site" }).first().click();
  await page
    .locator(
      "div:nth-child(2) > .row > div > .form-group > .multiselect > .multiselect__tags"
    )
    .first()
    .click();
  await page.getByText("Bangladesh").click();
  await page.getByRole("button", { name: "+30 Days" }).click();
  await page.locator("label").filter({ hasText: /^No$/ }).click();
  await page
    .locator(
      "div:nth-child(2) > .row > div:nth-child(2) > .form-group > .multiselect > .multiselect__tags"
    )
    .first()
    .click();
  await page.getByPlaceholder("Select State").fill("dha");
  await page.locator("span").filter({ hasText: "Dhaka" }).first().click();
  await page
    .locator(".col-12 > .form-group > .multiselect > .multiselect__tags")
    .first()
    .click();
  await page.getByText("Accompanist").first().click();
  await page
    .locator(
      "div:nth-child(3) > .form-group > .multiselect > .multiselect__tags"
    )
    .first()
    .click();
  await page.getByPlaceholder("Select City").fill("dha");
  await page.locator("span").filter({ hasText: "Dhaka" }).nth(3).click();
  await page
    .locator(".col-md-12 > .form-group > .multiselect > .multiselect__tags")
    .click();
  await page.getByPlaceholder("Select Skills").fill("php");
  await page.getByText("PHP").nth(1).click();
  await page.locator(".d-flex > .multiselect > .multiselect__select").click();
  await page.locator("span").filter({ hasText: "Internship" }).first().click();
  await page
    .locator(
      ".form-box > .row > div:nth-child(2) > .form-group > .multiselect > .multiselect__tags"
    )
    .click();
  await page
    .locator("span")
    .filter({ hasText: /^Junior$/ })
    .first()
    .click();
  await page
    .locator(
      ".form-box > .row > div:nth-child(3) > .form-group > .multiselect > .multiselect__tags"
    )
    .click();
  await page.getByText("Monthly").click();
  await page.getByPlaceholder("Office Time").click();
  await page.getByPlaceholder("Office Time").fill("8 am");
  await page.getByPlaceholder("Write salary here").click();
  await page.getByPlaceholder("Write salary here").fill("30000");
  await page.locator("label").filter({ hasText: "No" }).click();
  await page.getByText("Show Update Banner Image").click();
  await page.getByRole("button", { name: "Save and Continue" }).click();
  await page.getByPlaceholder("Duration in minutes").click();
  await page
    .getByRole("group")
    .locator("div")
    .filter({ hasText: "back Save and Publish" })
    .locator("div")
    .click();
  await page.getByRole("button", { name: "Publish", exact: true }).click();
  await page.getByRole("button", { name: "Save & Publish" }).click();
  await page.getByRole("button", { name: "Yes" }).click();
  await page.getByRole("button", { name: " Copy Link" }).click();
  await page.getByLabel("Close").click();
});
