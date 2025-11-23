import { type Page } from '@playwright/test';
import { test } from '../../tests/frontend/fixtures.js';

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
