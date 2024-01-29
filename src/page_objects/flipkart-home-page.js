const { expect } = require("@playwright/test");

exports.FlipkartHomePage = class FlipkartHomePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.contactUsLink = page.locator("//a[@aria-label='Contact Us']");
    this.aboutUsLink = page.locator("//a[@aria-label='About Us']");
    this.careersLink = page.locator("//a[@aria-label='Careers']");
    this.termsOfUseLink = page.locator("//a[@aria-label='Terms Of Use']");
    this.helpCenterHeader = page.locator("//h1");
    this.aboutHeader = page.locator("//a[contains(text(),'About')]");
    this.helpCenterIssues = page.locator(
      "(//div[@class='row'])[1]/div[1]/div/span"
    );
    this.aboutPageHeader = page.locator("(//a[@class='header-nav-btn'])");
    this.grocery = page.locator("//a[.='Grocery']");
    this.staples = page.locator("//img[@alt='Staples']");
  }

  async goto() {
    await this.page.goto("https://www.flipkart.com/");
  }

  async contactUs() {
    await this.contactUsLink.click();
    await expect(this.helpCenterHeader).toBeVisible();
  }

  async aboutUs() {
    await this.aboutUsLink.click();
    await expect(this.aboutHeader).toBeVisible();
  }

  async groceryLink() {
    await this.grocery.click();
  }
};
