import { SignInPage } from '../../../support/pages/sign-in-page.js';
import test from '../fixtures.js';
import { ProductsPage } from '../../../support/pages/products-page.js';

test.describe('Swag Labs Logout functionality', () => {
  let signInPage: SignInPage;
  let productsPage: ProductsPage;

  test.beforeEach('User Signs in', async ({ page }) => {
    signInPage = new SignInPage(page);
    productsPage = new ProductsPage(page);
    await signInPage.userNavigatesToSignInPage();
    await signInPage.userFillsUsername('standard_user');
    await signInPage.userFillsPassword(process.env.PASSWORD!);
    await signInPage.userClicksLoginButton();
    await signInPage.verifyUserIsLoggedIn();
  });

  test(`User is able to logout`, async () => {
    await productsPage.userClickHamburgerMenu();
    await productsPage.userClickLogoutButton();
  });
});
