import { test as base, expect } from '@playwright/test';

import * as fs from 'fs';
import * as path from 'path';
import { TestInfo } from '@playwright/test';

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
test.afterEach(async ({}, testInfo: TestInfo) => {

    const files = fs.readdirSync(testInfo.outputDir);

    for (const file of files) {

        const filePath = path.join(testInfo.outputDir, file);

        // Screenshots
        if (file.endsWith('.png')) {

            await testInfo.attach('Screenshot', {
                path: filePath,
                contentType: 'image/png',
            });
        }

        // Videos
        if (file.endsWith('.webm')) {

            await testInfo.attach('Video', {
                path: filePath,
                contentType: 'video/webm',
            });
        }

        // Traces
        if (file.endsWith('.zip')) {

            await testInfo.attach('Trace', {
                path: filePath,
                contentType: 'application/zip',
            });
        }
    }
});

export { expect };