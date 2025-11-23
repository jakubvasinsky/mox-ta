import { SignInPage } from '../../../support/pages/sign-in-page.js';
import test from '../fixtures.js';
import { ErrorMessage } from '../../../support/rest-client/error-message.type.js';

test.describe('Swag Labs Sign in', () => {
  let signInPage: SignInPage;

  test.beforeEach('User navigates to Sign in page', async ({ page }) => {
    signInPage = new SignInPage(page);
    await signInPage.userNavigatesToSignInPage();
  });

  const userNames: string[] = ['standard_user', 'problem_user', 'performance_glitch_user', 'error_user', 'visual_user'];

  for (const testUsername of userNames) {
    test(`User "${testUsername}" is able to log in using correct credentials`, async () => {
      await signInPage.verifyLogoIsDisplayed();
      await signInPage.verifySignInPageContainsAllFeatures();
      await signInPage.userFillsUsername(testUsername);
      await signInPage.userFillsPassword(process.env.PASSWORD!);
      await signInPage.userClicksLoginButton();
      await signInPage.verifyUserIsLoggedIn();
    });
  }

  test(`User is not able to log in using locked out credentials`, async () => {
    await signInPage.verifyLogoIsDisplayed();
    await signInPage.verifySignInPageContainsAllFeatures();
    await signInPage.userFillsUsername('locked_out_user');
    await signInPage.userFillsPassword(process.env.PASSWORD!);
    await signInPage.userClicksLoginButton();
    await signInPage.verifyErrorMessageIsDisplayed(ErrorMessage.LOCKED_OUT_USER);
  });

  test(`User is not able to log in using incorrect username`, async () => {
    await signInPage.verifyLogoIsDisplayed();
    await signInPage.verifySignInPageContainsAllFeatures();
    await signInPage.userFillsUsername('invalid_username');
    await signInPage.userFillsPassword(process.env.PASSWORD!);
    await signInPage.userClicksLoginButton();
    await signInPage.verifyErrorMessageIsDisplayed(ErrorMessage.INVALID_USERNAME_OR_PASSWORD);
  });

  test(`User is not able to log in using incorrect credentials`, async () => {
    await signInPage.verifyLogoIsDisplayed();
    await signInPage.verifySignInPageContainsAllFeatures();
    await signInPage.userFillsUsername(userNames[0]);
    await signInPage.userFillsPassword('invalid_password');
    await signInPage.userClicksLoginButton();
    await signInPage.verifyErrorMessageIsDisplayed(ErrorMessage.INVALID_USERNAME_OR_PASSWORD);
  });
});
