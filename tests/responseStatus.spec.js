import { test, expect } from "@playwright/test";

test("Check HTTP Status", async ({ page }) => {
  const urls = [
    "https://wpdeveloper.com/",
    "https://xcloud.host/",
    "https://essential-addons.com/",
    "https://templately.com/",
    "https://betterdocs.co/",
    "https://essential-blocks.com/",
    "https://notificationx.com/",
    "https://easy.jobs/",
    "https://embedpress.com/",
    "https://betterlinks.io/",
    "https://flexia.pro/",
    "https://storeware.io/",
  ];

  const CHUNK_SIZE = 5;

  async function checkUrlsInChunks(urls, chunkSize) {
    const results = [];

    for (let i = 0; i < urls.length; i += chunkSize) {
      const chunk = urls.slice(i, i + chunkSize);
      const chunkPromises = chunk.map(async (url) => {
        try {
          const startTime = Date.now();
          const response = await page.context().request.get(url);
          const endTime = Date.now();

          return {
            url,
            status: response.status(),
            responseTime: endTime - startTime,
          };
        } catch (error) {
          return {
            url,
            status: "Error",
            error: error.message,
          };
        }
      });

      const chunkResults = await Promise.all(chunkPromises);
      results.push(...chunkResults);
    }

    return results;
  }

  const results = await checkUrlsInChunks(urls, CHUNK_SIZE);

  results.forEach(({ url, status, responseTime, error }) => {
    if (error) {
      console.log(`URL: ${url}, Status: Error - ${error}`);
    } else {
      console.log(
        `URL: ${url}, Status Code: ${status}, Response Time: ${responseTime}ms`
      );
    }
  });

  results.forEach((result) => {
    if (!result.error) {
      expect(result.status).toBeLessThan(400);
    }
  });
});

test.describe.configure({ mode: "parallel" });

test.setTimeout(30000);
