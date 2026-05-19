import {test as base,APIRequestContext,request} from '@playwright/test';

import { logger } from '../utils/logger';



export const test = base.extend<{apiContext: APIRequestContext}>({ //original playwright ko extend kiya

  apiContext: async ({}, use) => {

    const apiContext = await request.newContext({

      baseURL: 'https://parabank.parasoft.com',

      extraHTTPHeaders: {
        Accept: 'application/json',//server ko json format mai bhejne ke liye force karna
      },
    });//direct backend communication ke liye

    logger.info('API session started');

    await use(apiContext);

    await apiContext.dispose();

    logger.info('API session closed');
  },
});

export { expect } from '@playwright/test';//expect is not customised but required for assertions in tests 