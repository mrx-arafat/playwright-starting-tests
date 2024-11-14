// Import necessary modules
import { test, expect } from "@playwright/test";
import axios from "axios";

// Slack webhook URL
const slackWebhookUrl =
  "https://hooks.slack.com/services/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";

// Function to send a Slack notification
async function sendCoffeeNotification() {
  try {
    const payload = {
      text: "☕ Coffee Break Time! ☕\nThe coffee service is now available for orders!",
      attachments: [
        {
          fallback: "Coffee order options",
          callback_id: "coffee_order",
          color: "#3AA3E3",
          attachment_type: "default",
          actions: [
            {
              name: "order",
              text: "Order Now! ☕",
              type: "button",
              style: "primary",
              url: "https://wpcafe.app",
            },
          ],
        },
      ],
    };
    await axios.post(slackWebhookUrl, payload);
    console.log("Coffee notification sent to Slack successfully.");
  } catch (error) {
    console.error("Failed to send notification to Slack:", error.message);
  }
}

// Playwright test to check maintenance message
test("Check coffee service maintenance", async ({ page }) => {
  // Step 1: Go to the login page
  await page.goto("https://wpcafe.app/login?redirect=%2F");
  console.log("Navigated to login page.");

  // Step 2: Log in with credentials
  await page.getByPlaceholder("Email").fill("arafat@wpdeveloper.com");
  await page.getByPlaceholder("Password").fill("arafat69");
  await page.getByRole("button", { name: "Sign In" }).click();
  console.log("Logged in successfully.");

  // Step 3: Wait for navigation and check for maintenance message
  await page.waitForNavigation();
  console.log("Checking for maintenance message...");

  // Step 4: Look for the maintenance message
  const maintenanceHeading = await page.getByRole("heading", {
    name: "The coffee service is under maintenance.",
  });
  const isMaintenance = await maintenanceHeading.isVisible();

  if (isMaintenance) {
    console.log("Maintenance detected: Coffee service is under maintenance.");
  } else {
    console.log("Coffee service is available. Sending Slack notification.");
    await sendCoffeeNotification();
  }
});
