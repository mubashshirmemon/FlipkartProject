const { test, expect } = require("@playwright/test");
const { FlipkartHomePage } = require("../page_objects/flipkart-home-page");

test("getting started should contain table of contents", async ({ page }) => {
  const flipkartHome = new FlipkartHomePage(page);
  await flipkartHome.goto();
  await flipkartHome.contactUs();
  await expect(flipkartHome.helpCenterIssues).toHaveText([
    "TYPE OF ISSUE",
    "Help Topics",
  ]);
});

test("should show Page Object Model article", async ({ page }) => {
  const flipkartHome = new FlipkartHomePage(page);
  await flipkartHome.goto();
  await flipkartHome.aboutUs();
  await expect(flipkartHome.aboutPageHeader).toHaveText([
    "About",
    "Ethics",
    "Culture",
    "Technology",
    "Sustainability",
    "Stories",
  ]);
});
