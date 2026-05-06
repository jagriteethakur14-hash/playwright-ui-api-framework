import { Page, expect } from '@playwright/test';

export class ProductsPage {
  constructor(private page: Page) {}

  async verifyProductsPage() {
    await expect(this.page.locator('.title')).toHaveText('Products');
  }

  async addProductToCart(productName: string) {

    const product = this.page
      .locator('.inventory_item')
      .filter({ hasText: productName });

    await product
      .getByRole('button', { name: 'Add to cart' })
      .click();
  }

  async goToCart() {
    await this.page.locator('.shopping_cart_link').click();
  }
}