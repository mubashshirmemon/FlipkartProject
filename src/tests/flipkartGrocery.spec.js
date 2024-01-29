const { test, expect } = require("@playwright/test");
const { FlipkartHomePage } = require("../page_objects/flipkart-home-page");
const {
  FlipkartGroceryPage,
} = require("../page_objects/flipkart-grocery-page");

test("Test that all staples are listed or not", async ({ page }) => {
  const flipkartHome = new FlipkartHomePage(page);
  const flipkartGrocery = new FlipkartGroceryPage(page);
  await flipkartHome.goto();
  await flipkartHome.groceryLink();
  await flipkartGrocery.enterPincode();
  await flipkartGrocery.hoverOverStaples();
  await expect(flipkartGrocery.hoverOverStaples).toHaveText([
    "TYPE OF ISSUE",
    "Help Topics",
  ]);
});
