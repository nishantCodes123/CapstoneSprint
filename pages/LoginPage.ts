import { Page, expect } from '@playwright/test';
import { logger } from '../utils/logger';

export class LoginPage {

  constructor(private page: Page) { }

  async login(username: string, password: string) {

    logger.info('Logging into ParaBank');

    await this.page.goto(
      'https://parabank.parasoft.com/parabank/index.htm'
    );

    await this.page.fill(
      'input[name="username"]',
      username
    );

    await this.page.fill(
      'input[name="password"]',
      password
    );

    await this.page.click(
      'input[value="Log In"]'
    );
  }

  async expectLoginSuccess() {

    logger.info('Checking login status');

    await expect(
      this.page.getByText('Welcome')
    ).toBeVisible();
  }

  async expectInvalidLoginError() {

    logger.info('Checking invalid login error');

    await expect(
      this.page.locator('.error')
    ).toBeVisible();
  }
}