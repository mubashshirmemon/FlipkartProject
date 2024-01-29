const { expect } = require("@playwright/test");

exports.FlipkartGroceryPage = class FlipkartGroceryPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.pincode = page.locator("//input[@placeholder='Enter pincode']");
    this.staples = page.locator("//img[@alt='Staples']");
    this.groceryLogo = page.locator("(//img[@alt='Flipkart'])[1]");
  }

  async enterPincode() {
    await this.pincode.fill("400050");
    await this.page.keyboard.press("Enter");
    await expect(this.groceryLogo).toBeVisible();
  }

  async hoverOverStaples() {
    await this.page.waitForSelector("//img[@alt='Staples']", {
      state: "visible",
      timeout: 10000,
    });
    await this.staples.hover();
    await expect(this.staples).toBeVisible();
  }
};
