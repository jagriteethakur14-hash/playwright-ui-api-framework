import { Page, expect } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async verifyProductInCart(productName: string) {

    const cartItem = this.page
      .locator('.cart_item')
      .filter({ hasText: productName });

    await expect(cartItem).toBeVisible();
  }
}