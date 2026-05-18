import { Page, expect } from '@playwright/test';

import { logger } from '../utils/logger';

export class OpenAccountPage {

  constructor(private page: Page) {}

  async open() {

    logger.info('Opening account creation page');

    await this.page.click('text=Open New Account');
  }

  async selectAccountType(accountType: string) {

    logger.info(`Choosing account type: ${accountType}`);

    await this.page.selectOption(
      '#type',
      accountType
    );
  }

  async selectSourceAccount() {

    logger.info('Selecting source account');

    await this.page.selectOption(
      '#fromAccountId',
      { index: 0 }
    );
  }

  async submit() {

    logger.info('Submitting account request');

    await this.page.click(
      'input[value="Open New Account"]'
    );
  }

  async expectAccountCreated() {

    logger.info('Checking account creation status');

    await expect(
      this.page.locator('#openAccountResult')
    ).toContainText('Account Opened!');
  }

  async createSavingsAccount() {

    await this.selectAccountType('1');

    await this.selectSourceAccount();

    await this.submit();
  }

  async createCheckingAccount() {

    await this.selectAccountType('0');

    await this.selectSourceAccount();

    await this.submit();
  }
}