const { test, expect } = require("@playwright/test");
const axios = require("axios");

// Slack webhook URL and Arafat's Slack user ID
const slackWebhookUrl =
  "https://hooks.slack.com/services/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";
const arafatUserId = "U07JZV8QR1D";

// Function to send a Slack notification
async function sendCoffeeNotification(statusMessage, showOrderButton = false) {
  const payload = {
    text: `<@${arafatUserId}> ${statusMessage}`,
    attachments: showOrderButton
      ? [
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
        ]
      : [],
  };

  try {
    await axios.post(slackWebhookUrl, payload);
    console.log("Notification sent to Slack successfully.");
  } catch (error) {
    console.error("Failed to send notification to Slack:", error.message);
  }
}

// Main test to check the coffee service status
test.use({ storageState: "coffee.json" }); // Load saved state for fast login

test("Check coffee service maintenance", async ({ page }) => {
  // Go directly to the homepage, skipping login
  await page.goto("https://wpcafe.app/");
  console.log("Navigated to the homepage using saved login state.");

  // Wait for the page to load and look for maintenance message
  const maintenanceMessage = await page.locator(
    ".container.maintenance-container .card-title.maintenance-card-title"
  );

  if (await maintenanceMessage.isVisible()) {
    const maintenanceText = await maintenanceMessage.innerText();
    console.log(`Maintenance message detected: '${maintenanceText}'`);

    if (maintenanceText.includes("The coffee service is under maintenance.")) {
      console.log(
        "Maintenance confirmed: Coffee service is under maintenance."
      );
      await sendCoffeeNotification(
        "🚨 The coffee service is currently under maintenance."
      );
    } else {
      console.log("Maintenance message differs from expected.");
      await sendCoffeeNotification(
        "☕ Coffee service is available for orders!",
        true
      );
    }
  } else {
    console.log(
      "No maintenance message found. Assuming coffee service is available."
    );
    await sendCoffeeNotification(
      "☕ Coffee service is available for orders!",
      true
    );
  }
});
