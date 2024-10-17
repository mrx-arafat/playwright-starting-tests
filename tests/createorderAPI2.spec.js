const { test, expect, request } = require("@playwright/test");

// Login credentials for API
const loginPayload = {
  userEmail: "anshika@gmail.com",
  userPassword: "Iamking@000",
};

// Payload for placing the order
const orderPayload = {
  orders: [
    {
      country: "Cuba",
      productOrderedId: "62023a7616fcf7200ef1b6c2", // Replace with actual product ID
    },
  ],
};

let token; // Variable to store the authentication token
let orderId; // Variable to store the order ID after placing the order

// Step 1: Login and place the order using API before tests run
test.beforeAll(async () => {
  const apiContext = await request.newContext();

  // Step 1.1: Login API request to get the token
  const loginResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
    {
      data: loginPayload,
    }
  );

  // Log and check if the login request is successful
  console.log("Login Response Status:", loginResponse.status());
  expect(loginResponse.ok()).toBeTruthy(); // Assert that the login response is OK

  // Extract token from the login response
  const loginResponseJson = await loginResponse.json();
  token = loginResponseJson.token;
  console.log("Token:", token);

  // Step 1.2: Place an order using the retrieved token
  const orderResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
      data: orderPayload, // Send the order payload
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    }
  );

  // Log the order response status and body for debugging
  console.log("Order Response Status:", orderResponse.status());
  const responseBody = await orderResponse.text(); // Capture response as plain text
  console.log("Order Response Body:", responseBody);

  // Check if the order request was successful
  expect(orderResponse.ok()).toBeTruthy(); // This is where the error happens

  // Parse the order response JSON
  const orderResponseJson = await orderResponse.json();
  console.log("Order Response JSON:", orderResponseJson);

  // Extract the order ID from the response
  orderId = orderResponseJson.orders[0];
  console.log("Order ID:", orderId);
});

// Step 2: Validate the placed order in the browser UI
test("Browser Context - Validating Order Placement", async ({ page }) => {
  // Inject the token into localStorage before the page loads
  await page.addInitScript((token) => {
    window.localStorage.setItem("token", token);
  }, token);

  // Navigate to the client page after injecting the token
  await page.goto("https://rahulshettyacademy.com/client");

  // Wait for the page to be fully loaded
  await page.waitForLoadState("networkidle");

  // Step 2.1: Click on the 'My Orders' button to view placed orders
  await page.locator("button[routerlink*='myorders']").click();

  // Wait for the orders table to be displayed
  await page.locator("tbody").waitFor();

  // Get all rows from the orders table
  const rows = await page.locator("tbody tr");

  // Step 2.2: Iterate through the rows to find the order with the matching orderId
  for (let i = 0; i < (await rows.count()); ++i) {
    // Get the order ID text from the current row (assuming the order ID is in a <th> tag)
    const rowOrderId = await rows.nth(i).locator("th").textContent();

    // Check if the current row's order ID matches the expected orderId
    if (orderId.includes(rowOrderId)) {
      // Click the button in the current row (assuming it's the first button)
      await rows.nth(i).locator("button").first().click();

      // Break out of the loop once the order is found and clicked
      break;
    }
  }

  // Step 2.3: After clicking, validate the order details on the next page
  const orderIdDetails = await page.locator(".col-text").textContent();

  // Verify that the order details page contains the correct order ID
  expect(orderId.includes(orderIdDetails)).toBeTruthy();
  console.log(`Order ${orderId} found in "My Orders".`);
});
