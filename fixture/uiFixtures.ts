import { test as base, expect } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { OpenAccountPage } from '../pages/OpenNewAccount';

export const test = base.extend<{ loginPage: LoginPage;registerPage: RegisterPage;openAccountPage: OpenAccountPage;}>({

  loginPage: async ({ page }, use) => {

    const loginPage = new LoginPage(page);

    await use(loginPage);
  },

  registerPage: async ({ page }, use) => {

    const registerPage = new RegisterPage(page);

    await use(registerPage);
  },

  openAccountPage: async ({ page }, use) => {

    const openAccountPage = new OpenAccountPage(page);

    await use(openAccountPage);
  },
});

export { expect };