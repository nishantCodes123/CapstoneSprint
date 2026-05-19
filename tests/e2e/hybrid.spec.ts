import { test, expect } from '../../fixture/apiFixtures';
import registerData from '../../testData/registerData.json';
import { RegisterPage } from '../../pages/RegisterPage';
import { OpenAccountPage } from '../../pages/OpenNewAccount';
import { logger } from '../../utils/logger';

test.describe('Hybrid E2E Tests @e2e', () => {

  
  test('TC-E2E-01 Register a new user and confirm the savings account via API @e2e @smoke @regression', async ({
    page,
    apiContext,
  }) => {
    const registerPage = new RegisterPage(page);
    const openAccountPage = new OpenAccountPage(page);

    
    logger.info('Registering a new user through the UI');
    await registerPage.open();
    await registerPage.register(registerData.validUser);
    // await registerPage.expectRegistrationSuccess();

    
    logger.info(' Opening a savings account for the new user');
    await openAccountPage.open();
    await openAccountPage.createSavingsAccount();
    await openAccountPage.expectAccountCreated();

   
    const newAccountIdLocator = page.locator('#newAccountId');
    await expect(newAccountIdLocator).toBeVisible();
    const newAccountId = (await newAccountIdLocator.textContent())?.trim();
    expect(newAccountId).toBeTruthy();
    logger.info(` New account ID captured from UI: ${newAccountId}`);

    await page.screenshot({ path: 'screenshots/new-account-created.png' });

    
    logger.info(` Verifying account ${newAccountId} through the API`);
    const response = await apiContext.get(
      `/parabank/services/bank/accounts/${newAccountId}`
    );

    expect(response.status()).toBe(200);

    const accountData = await response.json();
    logger.info(`API returned: ${JSON.stringify(accountData)}`);

    // The ID and type must match 
    expect(String(accountData.id)).toBe(String(newAccountId));
    expect(accountData.type).toBe('SAVINGS');

    logger.info('Hybrid E2E test passed — UI and API are in sync');
  });

});