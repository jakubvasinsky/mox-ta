import { faker } from '@faker-js/faker/locale/sk';
import { SignInPage } from '../../../support/pages/sign-in-page.js';
import test from '../fixtures.js';
import { ProductsPage } from '../../../support/pages/products-page.js';

test.describe('Shopping Cart & Checkout functionality', () => {
  let signInPage: SignInPage;
  let productsPage: ProductsPage;
  let fistName: string = 'TA_FIRST_NAME_' + faker.string.numeric(5);
  let lastName: string = 'TA_LAST_NAME_' + faker.string.numeric(5);
  let postalCode: string = 'TA_POSTAL_CODE_' + faker.string.numeric(5);

  test.beforeEach('User navigates to Sign in page', async ({ page }) => {
    signInPage = new SignInPage(page);
    productsPage = new ProductsPage(page);
    await signInPage.userNavigatesToSignInPage();
    await signInPage.userFillsUsername('standard_user');
    await signInPage.userFillsPassword(process.env.PASSWORD!);
    await signInPage.userClicksLoginButton();
    await signInPage.verifyUserIsLoggedIn();
  });

  test(`User is able to add a product to the cart & proceed to checkout`, async () => {
    await productsPage.userAddBackpackToCart();
    await productsPage.userOpenShoppingCart();
    await productsPage.userClickCheckoutButton();
    await productsPage.userFillFirstNameInput(fistName);
    await productsPage.userFillLastNameInput(lastName);
    await productsPage.userFillPostalCodeInput(postalCode);
    await productsPage.userClickContinueButton();
    await productsPage.userClickFinishButton();
  });
});
