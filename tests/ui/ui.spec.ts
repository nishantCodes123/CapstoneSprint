import { test } from '../../fixture/uiFixtures';
import registerData from '../../testData/registerData.json';
import { logger } from '../../utils/logger';

test.describe('UI Test Cases @ui', () => {

  test('TC-AC-UI-01 Create New User Account with Valid Data @smoke @regression',async ({registerPage,openAccountPage
    }) => {

      await registerPage.open();

      const dynamicUser = {
        ...registerData.validUser,
        username: `user_${Date.now()}`
      };

      await registerPage.register(dynamicUser);

      await registerPage.expectRegistrationSuccess();

      await openAccountPage.open();

      await openAccountPage.createSavingsAccount();

      await openAccountPage.expectAccountCreated();
    }
  );

  test('TC-LOGIN-01 Login with Valid Credentials @smoke @regression',async ({ loginPage }) => {

      await loginPage.login(
        registerData.validUser.username,
        registerData.validUser.password
      );

      await loginPage.expectLoginSuccess();
    }
  );

  test('TC-NEG-02 Register with Mismatched Passwords @negative @regression',async ({ registerPage }) => {

      await registerPage.open();

      await registerPage.registerWithMismatchedPassword(
        registerData.validUser,
        'WrongPass@123'
      );

      await registerPage.expectPasswordMismatchError();
    }
  );

  test('TC-NEG-01 Register with All Blank Fields @regression',async ({ registerPage }) => {

      await registerPage.open();

      await registerPage.submitEmptyForm();

      await registerPage.expectBlankFieldErrors();
    }
  );

  test('TC-LOGIN-02 Login with Invalid Password @regression @negative',async ({loginPage }) => {

    
      

      await loginPage.login(
        registerData.validUser.username,
        registerData.invalidPasswordUser.password
      );

      await loginPage.expectInvalidLoginError();
    }
  ); // to be put in defect report

  test('TC-NEG-06 Register with special character username @regression @negative',async ({ registerPage }) => {

      await registerPage.open();

      const dynamicSpecialUser = {
        ...registerData.validUser,
        username: `@@@###_${Date.now()}`
      };

      await registerPage.registerWithSpecialUsername(
        dynamicSpecialUser,
        dynamicSpecialUser.username
      );

      await registerPage.expectRegistrationSuccess();
      
    }
  ); // to be put in defect report

  test('TC-AC-UI-02 Mandatory Field Validation @regression',async ({ registerPage }) => {

      await registerPage.open();

      await registerPage.submitEmptyForm();

      await registerPage.expectBlankFieldErrors();
    }
  );
test('TC-UI-PERF-01 Validate login page load time  @performance',async ({ loginPage }) => {

    logger.info('Checking ParaBank login page load time');

    const startTime = Date.now();

    await loginPage.login(
      registerData.validUser.username,
      registerData.validUser.password
    );

    const endTime = Date.now();

    const loadTime = endTime - startTime;

    logger.info(
      `Login flow completed in ${loadTime} ms`
    );


  }
);


});