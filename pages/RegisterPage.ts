import { Page, expect } from '@playwright/test';

import { logger } from '../utils/logger';

export class RegisterPage {

  constructor(private page: Page) {}

  async open() {

    logger.info('Opening registration page');

    await this.page.goto(
      'https://parabank.parasoft.com/parabank/register.htm'
    );
  }

  async register(userData: any) {

    logger.info('Filling registration form');

    await this.page.fill('input[id="customer.firstName"]',userData.firstName);

    await this.page.fill('input[id="customer.lastName"]',userData.lastName);

    await this.page.fill('input[id="customer.address.street"]',userData.address );

    await this.page.fill( 'input[id="customer.address.city"]', userData.city);

    await this.page.fill('input[id="customer.address.state"]',userData.state);

    await this.page.fill('input[id="customer.address.zipCode"]', userData.zipCode);

    await this.page.fill( 'input[id="customer.phoneNumber"]', userData.phone);

    await this.page.fill('input[id="customer.ssn"]',userData.ssn);

    await this.page.fill('input[id="customer.username"]',userData.username);

    await this.page.fill('input[id="customer.password"]',userData.password);

    await this.page.fill('input[id="repeatedPassword"]',userData.password);

    await this.page.screenshot({path: 'screenshots/register-filled.png'});

    await this.page.click('input[value="Register"]');
  }

  async expectRegistrationSuccess() {

    logger.info('Checking registration status');

    await expect(
      this.page.locator('h1.title')
    ).toContainText('Welcome');
  }

  async registerWithMismatchedPassword(
    userData: any,
    wrongPassword: string
  ) {

    logger.info('Submitting mismatched passwords');

    await this.page.fill(
      'input[id="customer.firstName"]',
      userData.firstName
    );

    await this.page.fill(
      'input[id="customer.lastName"]',
      userData.lastName
    );

    await this.page.fill(
      'input[id="customer.address.street"]',
      userData.address
    );

    await this.page.fill(
      'input[id="customer.address.city"]',
      userData.city
    );

    await this.page.fill(
      'input[id="customer.address.state"]',
      userData.state
    );

    await this.page.fill(
      'input[id="customer.address.zipCode"]',
      userData.zipCode
    );

    await this.page.fill(
      'input[id="customer.phoneNumber"]',
      userData.phone
    );

    await this.page.fill(
      'input[id="customer.ssn"]',
      userData.ssn
    );

    await this.page.fill(
      'input[id="customer.username"]',
      userData.username
    );

    await this.page.fill(
      'input[id="customer.password"]',
      userData.password
    );

    await this.page.fill(
      'input[id="repeatedPassword"]',
      wrongPassword
    );

    await this.page.click(
      'input[value="Register"]'
    );
  }

  async expectPasswordMismatchError() {

    logger.info('Checking password mismatch validation');

    await expect(
      this.page.locator(
        "//span[@id='repeatedPassword.errors']"
      )
    ).toBeVisible();
  }

  async submitEmptyForm() {

    logger.info('Submitting empty registration form');

    await this.page.click(
      'input[value="Register"]'
    );
  }

  async expectBlankFieldErrors() {

    logger.info('Checking required field validations');

    await expect(
      this.page.locator(
        "//span[@id='customer.firstName.errors']"
      )
    ).toContainText('First name is required.');
  }

  async registerWithSpecialUsername(
    userData: any,
    specialUsername: string
  ) {

    logger.info('Trying special characters in username');

    await this.page.fill(
      'input[id="customer.firstName"]',
      userData.firstName
    );

    await this.page.fill(
      'input[id="customer.lastName"]',
      userData.lastName
    );

    await this.page.fill(
      'input[id="customer.address.street"]',
      userData.address
    );

    await this.page.fill(
      'input[id="customer.address.city"]',
      userData.city
    );

    await this.page.fill(
      'input[id="customer.address.state"]',
      userData.state
    );

    await this.page.fill(
      'input[id="customer.address.zipCode"]',
      userData.zipCode
    );

    await this.page.fill(
      'input[id="customer.phoneNumber"]',
      userData.phone
    );

    await this.page.fill(
      'input[id="customer.ssn"]',
      userData.ssn
    );

    await this.page.fill(
      'input[id="customer.username"]',
      specialUsername
    );

    await this.page.fill(
      'input[id="customer.password"]',
      userData.password
    );

    await this.page.fill(
      'input[id="repeatedPassword"]',
      userData.password
    );

    await this.page.click(
      'input[value="Register"]'
    );
  }

  async expectSpecialUsernameError() {

    logger.info('Checking username validation');

    await expect(
      this.page.locator(
        "//span[@id='customer.username.errors']"
      )
    ).toBeVisible();
  }
}