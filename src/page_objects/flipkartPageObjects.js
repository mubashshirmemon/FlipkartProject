class FlipkartHomePage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("https://www.flipkart.com/");
  }

  async searchProduct(query) {
    await this.page.fill('input[name="q"]', query);
    await this.page.press('input[name="q"]', "Enter");
  }

  async getSearchResults() {
    await this.page.waitForSelector("(//img[@loading='eager'])");
    return await this.page.$$("(//img[@loading='eager'])");
  }

  async clickFirstSearchResult() {
    await this.page.waitForSelector(
      "//div[contains(@data-tkid,'en_')]//parent::div[@data-id]"
    );
    const [popup] = await Promise.all([
      this.page.waitForEvent("popup"),
      this.page.click(
        "//div[contains(@data-tkid,'en_')]//parent::div[@data-id]"
      ),
    ]);
    this.page2 = popup;
  }

  async getProductName() {
    await this.page2.waitForSelector(".B_NuCI");
    return await this.page2.textContent(".B_NuCI");
  }

  async addProductToCart() {
    await this.page2.click("button._2KpZ6l._2U9uOA._3v1-ww");
    await this.page2.waitForSelector("._253qQJ");
    const inputElement = this.page2.locator("._253qQJ");
    const cartCount = await inputElement.getAttribute("value");

    return cartCount;
  }

  async getSortingOptions() {
    await this.page.waitForSelector(
      "//span[@class='_2i7N3j']/following-sibling::div"
    );
    const sortingOptions = await this.page.$$eval(
      "//span[@class='_2i7N3j']/following-sibling::div",
      (options) => options.map((option) => option.textContent.trim())
    );
    return sortingOptions;
  }

  async applyFilter(filterCategory, filterValue) {
    // Replace with actual steps to apply filters based on category and value
    await this.page.waitForTimeout(3000);
    await this.page.getByText(`${filterCategory}`, { exact: true }).click();
    await this.page.getByText(`${filterValue}`, { exact: true }).click();
  }

  async clickNthSearchResult(index) {
    await this.page.waitForSelector("img._2r_T1I");
    const searchResults = await this.page.$$("img._2r_T1I");
    const page1Promise = this.page.waitForEvent("popup");
    await searchResults[index - 1].click();
    this.page1 = await page1Promise;
    // await this.page.waitForNavigation(); // Wait for the page to navigate to the product details
  }

  async addToCart() {
    await this.page1.waitForSelector('button:has-text("Add to cart")');
    await this.page1.click('button:has-text("Add to cart")');
    // Wait for the cart to be updated (replace with actual logic)
    await this.page1.waitForTimeout(2000);
  }

  async goBack() {
    await this.page.goBack();
    await this.page.waitForNavigation(); // Wait for the page to navigate back
  }

  async getCartCount() {
    await this.page1.waitForSelector("(//div[@class='nxl3SA'])[1]");
    const cartCountText = await this.page1.textContent(
      "(//div[@class='nxl3SA'])[1]"
    );

    console.log("cartCountText ", cartCountText);

    // Extract the numeric count from the text
    const numericPart = cartCountText.match(/\d+/);

    if (!numericPart) {
      throw new Error("Unable to extract numeric cart count from the page.");
    }
    const cartCount = parseInt(numericPart[0], 10);

    console.log("cartCount", cartCount);

    if (isNaN(cartCount)) {
      throw new Error("Unable to parse cart count from the page.");
    }

    return cartCount;
  }

  async getSellerInformation() {
    await this.page2.waitForSelector("(//div[@id='sellerName']//span)[2]");
    const sellerInfo = await this.page2.textContent(
      "(//div[@id='sellerName']//span)[2]"
    );
    console.log("sellerInfo", sellerInfo);
    return sellerInfo;
  }

  async navigateToCategory(category) {
    await this.page.click(`//span[text()='${category}']`);
    // await this.page.waitForNavigation(); // Wait for the page to navigate to the selected category
  }

  async getProductCount() {
    await this.page.waitForSelector("(//img[contains(@class,'kJjFO0')])");
    const productCount = await this.page.$$(
      "(//img[contains(@class,'kJjFO0')])"
    );

    // Extract numeric part from the text
    //const numericPart = productCountText.match(/\d+/);

    // if (!numericPart) {
    //   throw new Error("Unable to extract numeric product count from the page.");
    // }

    // const productCount = parseInt(numericPart[0], 10);

    // if (isNaN(productCount)) {
    //   throw new Error("Unable to parse product count from the page.");
    // }

    return productCount;
  }

  async isUserAuthenticated() {
    // Replace with actual logic to determine user authentication status
    await this.page.waitForSelector("div._1iKd3d ._2MlkI1");
    const isAuthenticated = await this.page.$eval(
      "div._1iKd3d ._2MlkI1",
      (element) => element.textContent.includes("My Account")
    );
    return isAuthenticated;
  }
}

module.exports = { FlipkartHomePage };
