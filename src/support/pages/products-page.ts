import { expect, type Locator, type Page } from '@playwright/test';
import test from '../../tests/frontend/fixtures.js';

import { SignInPage } from './sign-in-page.js';

export class ProductsPage extends SignInPage {
  readonly page: Page;
  readonly backpackLocator: Locator;
  readonly addBackpackToCartButton: Locator;
  readonly cartButton: Locator;
  readonly checkoutButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly hamburgerMenu: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;

    this.backpackLocator = page.getByText('Sauce Labs Backpack');
    this.addBackpackToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.cartButton = page.locator('[data-test="shopping-cart-link"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.hamburgerMenu = page.getByRole('button', { name: 'Open Menu' });
    this.logoutButton = page.locator('[data-test="logout-sidebar-link"]');
  }

  async userAddBackpackToCart() {
    await test.step(`User adds a backpack to cart`, async () => {
      await expect(this.backpackLocator).toBeVisible();
      await this.addBackpackToCartButton.click();
      await expect(this.cartButton).toBeVisible();
    });
  }
  async userOpenShoppingCart() {
    await test.step(`User opens a shopping cart`, async () => {
      await this.cartButton.click();
      await expect(this.page.getByText('Your Cart')).toBeVisible();
    });
  }

  async userClickCheckoutButton() {
    await test.step(`User clicks on checkout button`, async () => {
      await this.checkoutButton.click();
      await expect(this.page.getByText('Checkout: Your Information')).toBeVisible();
    });
  }

  async userFillFirstNameInput(firstName: string) {
    await test.step(`User fills firs name input >${firstName}<`, async () => {
      await this.firstNameInput.click();
      await this.firstNameInput.fill(firstName);
    });
  }

  async userFillLastNameInput(lastName: string) {
    await test.step(`User fills last name input >${lastName}<`, async () => {
      await this.lastNameInput.click();
      await this.lastNameInput.fill(lastName);
    });
  }

  async userFillPostalCodeInput(postalCode: string) {
    await test.step(`User fills postal code input >${postalCode}<`, async () => {
      await this.postalCodeInput.click();
      await this.postalCodeInput.fill(postalCode);
    });
  }

  async userClickContinueButton() {
    await test.step(`User clicks on continue button`, async () => {
      await this.continueButton.click();
      await expect(this.page.getByText('Checkout: Overview')).toBeVisible();
    });
  }

  async userClickFinishButton() {
    await test.step(`User clicks on finish button`, async () => {
      await this.finishButton.click();
      await expect(this.page.getByText('Thank you for your order!')).toBeVisible();
    });
  }

  async userClickHamburgerMenu() {
    await test.step(`User clicks on hamburger menu`, async () => {
      await this.hamburgerMenu.click();
    });
  }

  async userClickLogoutButton() {
    await test.step(`User clicks on Logout button`, async () => {
      await this.logoutButton.click();
      await expect(this.userNameInput).toBeVisible();
    });
  }
}
