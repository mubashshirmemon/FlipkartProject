const { test, expect } = require("@playwright/test");
const { FlipkartHomePage } = require("../page_objects/flipkartPageObjects");

// Test suite
test.describe("Flipkart Tests", () => {
  let page;

  // Test setup
  test.beforeEach(async ({ browser }) => {
    // Create a new page for each test
    page = await browser.newPage();
  });

  // Test case
  test("Search for a product", async () => {
    // Instantiate the FlipkartHomePage class
    const flipkartHomePage = new FlipkartHomePage(page);

    // Navigate to Flipkart
    await flipkartHomePage.goto();

    // Perform search
    await flipkartHomePage.searchProduct("laptop");

    // Verify search results
    const searchResults = await flipkartHomePage.getSearchResults();
    expect(searchResults.length).toBeGreaterThan(0);
  });

  test("Click on the first search result and verify product page", async () => {
    const flipkartHomePage = new FlipkartHomePage(page);
    await flipkartHomePage.goto();
    await flipkartHomePage.searchProduct("laptop");

    await flipkartHomePage.clickFirstSearchResult();
    const productName = await flipkartHomePage.getProductName();
    expect(productName).not.toBeNull();
  });

  test("Add a product to the cart", async () => {
    const flipkartHomePage = new FlipkartHomePage(page);
    await flipkartHomePage.goto();
    await flipkartHomePage.searchProduct("shoes");

    await flipkartHomePage.clickFirstSearchResult();
    const productName = await flipkartHomePage.getProductName();
    expect(productName).not.toBeNull();

    const cartCount = await flipkartHomePage.addProductToCart();

    expect(cartCount).toContain("1"); // Assuming the cart count is updated
  });

  test("Search for a product and verify sorting options", async () => {
    const flipkartHomePage = new FlipkartHomePage(page);
    await flipkartHomePage.goto();
    await flipkartHomePage.searchProduct("laptop");

    // Verify sorting options are available
    const sortingOptions = await flipkartHomePage.getSortingOptions();
    expect(sortingOptions).toContain("Relevance");
    expect(sortingOptions).toContain("Popularity");
    // Add more expectations based on available sorting options
  });

  test("Apply filters and verify filtered results", async () => {
    const flipkartHomePage = new FlipkartHomePage(page);
    await flipkartHomePage.goto();
    await flipkartHomePage.searchProduct("headphones");

    // Apply filters (replace with actual steps)
    await flipkartHomePage.applyFilter("Connectivity", "Bluetooth");
    await flipkartHomePage.applyFilter("Color", "Black");

    // Verify filtered results
    const filteredResults = await flipkartHomePage.getSearchResults();
    expect(filteredResults.length).toBeGreaterThan(0);
    // Add more specific assertions based on the applied filters
  });

  test("Add multiple products to the cart and verify the cart count", async () => {
    const flipkartHomePage = new FlipkartHomePage(page);
    await flipkartHomePage.goto();
    await flipkartHomePage.searchProduct("watches");

    // Add multiple products to the cart (replace with actual steps)
    for (let i = 1; i <= 3; i++) {
      await flipkartHomePage.clickNthSearchResult(i);
      await flipkartHomePage.addToCart();
      //await page.goBack(); // Go back to search results
    }

    // Verify the cart count
    const cartCount = await flipkartHomePage.getCartCount();
    expect(cartCount).toBe(3);
  });

  test("Navigate to product details and verify seller information", async () => {
    const flipkartHomePage = new FlipkartHomePage(page);
    await flipkartHomePage.goto();
    await flipkartHomePage.searchProduct("headphones");

    // Navigate to the product details page
    await flipkartHomePage.clickFirstSearchResult();

    // Verify seller information
    const sellerInfo = await flipkartHomePage.getSellerInformation();
    expect(sellerInfo).not.toBeNull();
  });

  test.skip("Verify user authentication", async () => {
    const flipkartHomePage = new FlipkartHomePage(page);
    await flipkartHomePage.goto();

    // Assuming user is not logged in
    const isAuthenticated = await flipkartHomePage.isUserAuthenticated();
    expect(isAuthenticated).toBeFalsy();

    // Add steps to log in (replace with actual steps)
    await flipkartHomePage.clickLoginButton();
    await flipkartHomePage.enterCredentials("your_username", "your_password");
    await flipkartHomePage.clickLogin();

    // Verify user is now authenticated
    const isAuthenticatedAfterLogin =
      await flipkartHomePage.isUserAuthenticated();
    expect(isAuthenticatedAfterLogin).toBeTruthy();
  });

  test("Navigate to different categories and verify products", async () => {
    const flipkartHomePage = new FlipkartHomePage(page);
    await flipkartHomePage.goto();

    // Categories to test
    const categories = ["Mobiles", "Appliances", "Travel"];

    for (const category of categories) {
      await flipkartHomePage.navigateToCategory(category);

      // Verify products in the category
      const productCount = await flipkartHomePage.getProductCount();
      expect(productCount.length).toBeGreaterThan(0);
      await page.goBack();
      try {
        await page.waitForSelector("._1E5Hij", {
          state: "visible",
          timeout: 2000,
        });

        await page.getByRole("button", { name: "✕" }).click();
      } catch (error) {
        console.log("Login pop up not found");
      }
    }
  });

  // Cleanup after each test
  test.afterEach(async () => {
    await page.close();
  });
});
