import { expect, type Locator, type Page } from '@playwright/test';
import test from '../../tests/frontend/fixtures.js';
import { BasePage } from './base-page.js';

export class SignInPage extends BasePage {
  readonly page: Page;
  readonly logo: Locator;
  readonly userNameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly productsTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.logo = this.page.getByText('Swag Labs');
    this.userNameInput = this.page.locator('[data-test="username"]');
    this.passwordInput = this.page.locator('[data-test="password"]');
    this.loginButton = this.page.locator('[data-test="login-button"]');
    this.productsTitle = this.page.locator('[data-test="title"]');
  }

  async userNavigatesToSignInPage() {
    await test.step('User navigates to Sign in page', async () => {
      await this.page.goto('https://www.saucedemo.com/');
    });
  }

  async verifyLogoIsDisplayed() {
    await test.step('Verify that logo is displayed', async () => {
      await expect(this.logo, 'Logo is visible').toBeVisible();
    });
  }

  async verifySignInPageContainsAllFeatures() {
    await test.step('Verify that Sign in page contains all features', async () => {
      await expect(this.userNameInput, 'Username field is not visible').toBeVisible();
      await expect(this.passwordInput, 'Password field is not visible').toBeVisible();
      await expect(this.loginButton, 'Login button is not visible').toBeVisible();
    });
  }

  async userFillsUsername(username: string) {
    await test.step(`User fills the username field with >${username}<`, async () => {
      await this.userNameInput.click();
      await this.userNameInput.fill(username);
    });
  }

  async userFillsPassword(password: string) {
    await test.step(`User fills the password field`, async () => {
      await this.passwordInput.click();
      await this.passwordInput.fill(password);
    });
  }

  async userClicksLoginButton() {
    await test.step(`User clicks the login button`, async () => {
      await this.loginButton.click();
    });
  }

  async verifyUserIsLoggedIn() {
    await test.step(`Verify that user is logged in`, async () => {
      await expect(this.productsTitle, 'Products title is not displayed').toBeVisible();
    });
  }

  async verifyErrorMessageIsDisplayed(errorMessage: string) {
    await test.step(`Verify that error message  >${errorMessage}< is displayed`, async () => {
      await expect(this.page.locator('div').getByText(errorMessage)).toBeVisible();
    });
  }
}
