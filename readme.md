## **Playwright Starting Tests**

**Overview**
This repository demonstrates basic end-to-end testing using Playwright.

**Setup**

1. Clone this repository:

   ```
   git clone https://github.com/mrx-arafat/playwright-starting-tests.git
   cd playwright-starting-tests
   ```

2. Install Playwright and necessary browsers:

   ```
   npx playwright install
   ```

**Running Tests**

1. To run all tests:

   ```
   npx playwright test
   ```

2. To run a specific test:

   ```
   npx playwright test tests/example.spec.js
   ```

3. To view the report after running tests:

   ```
   npx playwright show-report
   ```

**Debugging**

- Run tests with the Playwright Inspector:
  ```
  npx playwright test --debug
  ```

**Additional Commands**

- Record and generate test scripts:

  ```
  npx playwright codegen
  ```

- Run tests in headed mode (with browser UI):

  ```
  npx playwright test --headed
  ```

**Resources**
Playwright Documentation: https://playwright.dev/docs/intro

---

You can now include this plain text `README` in your repository.
