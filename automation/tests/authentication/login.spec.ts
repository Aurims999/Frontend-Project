import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page.ts';
import { GuestPage } from '../../pages/guest.page.ts';
import { login_validationTestData } from '../../test-data/authentication_page_data.js';
import { verifyPopupMessage } from '../../utils/genericMethods.ts';

let loginPage: LoginPage;
let guestPage: GuestPage;

test.use({storageState: { cookies: [], origins: [] }});

test.beforeEach(async({page})=>{
  await page.goto('/');
  guestPage = new GuestPage(page);
  loginPage = new LoginPage(page);
  await guestPage.loginButton.click();
  });

test.describe('@VB-10 - Successful login', () => {
  test('@Smoke - User is  able to login to account successfully', async () => {
    await loginPage.fillLoginData(process.env.EMAIL, process.env.PASSWORD);
    await loginPage.accountLoginButton.click();
    await expect(loginPage.profilePicture).toBeVisible();
  });
});

test.describe('@VB-33 - Login input validation popup messages', () => {
  login_validationTestData.forEach(({description, email, password, expectedPopupMessage}) => {
    test(description, async ({page}) => {
      await loginPage.fillLoginData(email, password);
      await loginPage.accountLoginButton.click();
      await verifyPopupMessage(page, expectedPopupMessage);
    });
  });
});

test.describe('@VB-32 - Logout', ()=> {
    test('@Smoke - User can logout from the account successfully, and his information is not accessible after logging out', async ({page})=> {
    await loginPage.loginToAccount();
    await expect(loginPage.profilePicture).toBeVisible();
    await loginPage.profilePicture.click();
    await expect(loginPage.profileDropdownMenu).toBeVisible();
    await loginPage.profileDropdownLogout.click();
    await expect(guestPage.pageTitle).toHaveText('Elevate Your Mood, One Track at a Time');
    await page.goBack();
    await expect(guestPage.pageTitle).toHaveText('Elevate Your Mood, One Track at a Time');
  });
});