import { expect, type Locator, type Page, type Response } from '@playwright/test';
import { test } from '../../tests/frontend/fixtures.js';
import { allure } from 'allure-playwright';
import fs from 'fs';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async refreshPage() {
    await test.step(`Page is refreshed`, async () => {
      await this.page.reload();
    });
  }
}
