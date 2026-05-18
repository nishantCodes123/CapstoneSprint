import { test, expect } from '../../fixture/apiFixtures';
import { logger } from '../../utils/logger';
import apiData from '../../testData/apiData.json';

test.describe('API Test Cases - Account Operations @api', () => {

  test('TC-API-01 Create savings account and fetch account details @api @smoke @regression',async ({ apiContext }) => {

      logger.info('Creating savings account');

      const createResponse = await apiContext.post(
        `/parabank/services/bank/createAccount?customerId=${apiData.validCustomer.customerId}&newAccountType=${apiData.accountTypes.savings}&fromAccountId=${apiData.validCustomer.fromAccountId}`
      );

      expect(createResponse.status()).toBe(200);

      const createdAccount = await createResponse.json();//response object creation

      logger.info(
        `Created account: ${JSON.stringify(createdAccount)}`
      );

      const newAccountId = createdAccount.id;

      expect(createdAccount.type).toBe('SAVINGS');

      expect(createdAccount.customerId).toBe(
        apiData.validCustomer.customerId
      );

      expect(newAccountId).toBeDefined();

      logger.info(`Fetching account: ${newAccountId}`);

      const getResponse = await apiContext.get(
        `/parabank/services/bank/accounts/${newAccountId}`
      );

      expect(getResponse.status()).toBe(200);

      const fetchedAccount = await getResponse.json();

      logger.info(
        `Fetched account: ${JSON.stringify(fetchedAccount)}`
      );

      expect(String(fetchedAccount.id))
        .toBe(String(newAccountId));

      expect(fetchedAccount.type)
        .toBe('SAVINGS');
    }
  );

  test('TC-API-02 Create checking account @api @regression',async ({ apiContext }) => {

      logger.info('Creating checking account');

      const response = await apiContext.post(
        `/parabank/services/bank/createAccount?customerId=${apiData.validCustomer.customerId}&newAccountType=${apiData.accountTypes.checking}&fromAccountId=${apiData.validCustomer.fromAccountId}`
      );

      expect(response.status()).toBe(200);

      const accountData = await response.json();

      logger.info(
        `Created account: ${JSON.stringify(accountData)}`
      );

      expect(accountData.type).toBe('CHECKING');

      expect(accountData.customerId).toBe(apiData.validCustomer.customerId);

      expect(accountData.balance).toBe(0);

      expect(accountData.id).toBeDefined();
    }
  );

  test('TC-API-03 Fetch invalid account details @api @negative @regression',async ({ apiContext }) => {

      logger.info('Fetching invalid account');

      const response = await apiContext.get(
        `/parabank/services/bank/accounts/${apiData.invalidData.fakeAccountId}`
      );

      const responseBody = await response.text();

      logger.info(`API response: ${responseBody}`);

      expect(response.status()).not.toBe(200);
    }
  );

  test('TC-API-04 Create account with invalid customer ID @api @negative @regression',async ({ apiContext }) => {

      logger.info('Creating account with invalid customer ID');

      const response = await apiContext.post(
        `/parabank/services/bank/createAccount?customerId=${apiData.invalidData.fakeCustomerId}&newAccountType=${apiData.accountTypes.savings}&fromAccountId=${apiData.validCustomer.fromAccountId}`
      );

      const responseBody = await response.text();

      logger.info(`API response: ${responseBody}`);

      expect(response.status()).not.toBe(200);
    }
  );
  test('TC-API-05 Validate account response schema @api @regression',async ({ apiContext }) => {

    logger.info('Validating account response schema');

    const response = await apiContext.get(
      `/parabank/services/bank/accounts/${apiData.validCustomer.fromAccountId}`
    );

    expect(response.status()).toBe(200);

    const accountData = await response.json();

    logger.info(
      `Schema response: ${JSON.stringify(accountData)}`
    );

    expect(accountData).toMatchObject({

      id: expect.any(Number),

      customerId: expect.any(Number),

      type: expect.any(String),

      balance: expect.any(Number),
    });

    expect(accountData.type)
      .toMatch(/SAVINGS|CHECKING/);

    logger.info('Schema validation successful');
  }
);
test('TC-API-06 Validate API response time @api @performance',async ({ apiContext }) => {

    logger.info('Checking API response time');

    const startTime = Date.now();

    const response = await apiContext.get(
      `/parabank/services/bank/accounts/${apiData.validCustomer.fromAccountId}`
    );

    const endTime = Date.now();

    const responseTime = endTime - startTime;

    logger.info(
      `Actual API response time: ${responseTime} ms`
    );

    expect(response.status()).toBe(200);

    if (responseTime < 2000) {

      logger.info(
        `API responded within acceptable limit: ${responseTime} ms`
      );

    } else {

      logger.error(
        `API response exceeded limit: ${responseTime} ms`
      );
    }

    expect(responseTime).toBeLessThan(2000);
  }
);

});