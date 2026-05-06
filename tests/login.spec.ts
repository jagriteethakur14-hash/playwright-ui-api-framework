import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../fixtures/testData';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { products } from '../fixtures/testData';

test.describe('SauceDemo Login Tests', () => {
  test('Login should be successful with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.gotoLoginPage();
    await loginPage.login(users.standard.username, users.standard.password);

    await page.locator('.title').waitFor();
  });

  test('Login should fail for locked out user', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.gotoLoginPage();
    await loginPage.login(users.locked.username, users.locked.password);

    await loginPage.verifyLoginError();
  });

  test('User should add product to cart successfully', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);

  await loginPage.gotoLoginPage();

  await loginPage.login(
    users.standard.username,
    users.standard.password
  );

  await productsPage.verifyProductsPage();
  await productsPage.addProductToCart(products[0]);
  await productsPage.goToCart();
  await cartPage.verifyProductInCart(products[0]);
});
});

