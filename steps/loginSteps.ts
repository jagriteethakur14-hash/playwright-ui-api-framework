import { Given, When, Then, Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { users, products } from '../fixtures/testData';

setDefaultTimeout(30 * 1000);

interface TestContext {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  loginPage?: LoginPage;
  productsPage?: ProductsPage;
  cartPage?: CartPage;
}

const testContext: TestContext = {};

Before(async () => {
  testContext.browser = await chromium.launch();
  testContext.context = await testContext.browser!.newContext({
    baseURL: 'https://www.saucedemo.com',
  });
  testContext.page = await testContext.context!.newPage();
  
  testContext.loginPage = new LoginPage(testContext.page);
  testContext.productsPage = new ProductsPage(testContext.page);
  testContext.cartPage = new CartPage(testContext.page);
});

After(async () => {
  if (testContext.page) {
    await testContext.page.close();
  }
  if (testContext.context) {
    await testContext.context.close();
  }
  if (testContext.browser) {
    await testContext.browser.close();
  }
});

// Background steps
Given('user navigates to the login page', async () => {
  await testContext.loginPage!.gotoLoginPage();
});

// Scenario: Login should be successful with valid credentials
When('user logs in with valid standard user credentials', async () => {
  await testContext.loginPage!.login(users.standard.username, users.standard.password);
});

Then('the products page should be displayed', async () => {
  await testContext.productsPage!.verifyProductsPage();
});

// Scenario: Login should fail for locked out user
When('user logs in with locked out user credentials', async () => {
  await testContext.loginPage!.login(users.locked.username, users.locked.password);
});

Then('an error message should be displayed', async () => {
  await testContext.loginPage!.verifyLoginError();
});

// Scenario: User should add product to cart successfully
When('user adds a product to the cart', async () => {
  await testContext.productsPage!.addProductToCart(products[0]);
});

When('user navigates to the cart page', async () => {
  await testContext.productsPage!.goToCart();
});

Then('the product should be visible in the cart', async () => {
  await testContext.cartPage!.verifyProductInCart(products[0]);
});
