import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page.ts';
import { GuestPage } from '../../pages/guest.page.ts';
import { loginCredentials } from '../../test-data/authentication_page_data.js';
import { validationMessages } from '../../../src/utils/messages/popupMessages.js';
import { verifyPopupMessage } from '../../utils/genericMethods.ts';

  let loginPage: LoginPage;
  let guestPage: GuestPage;

  test.beforeEach(async({page})=>{
    await page.goto('/');
    guestPage = new GuestPage(page);
    loginPage = new LoginPage(page);
    await guestPage.loginButton.click();
    });

  test.describe('@VB-10 - Login. Input validation popup messages', () => {
    test('@Smoke - User is  able to login to account successfully', async ({page}) => {
      await loginPage.fillLoginData(process.env.EMAIL, process.env.PASSWORD);
      await loginPage.accountLoginButton.click();
      await expect(loginPage.profilePicture).toBeVisible();
    });
    test('User cannot login to account - receives popup message when enters no password', async ({page})=> {
      await loginPage.fillLoginData(process.env.EMAIL, loginCredentials.PASSWORD_MISSING);
      await loginPage.accountLoginButton.click();
      await verifyPopupMessage(page, validationMessages.PASSWORD_MISSING);
    });
    test('@Smoke - User cannot login to account - receives popup message when enters invalid password', async ({page})=> {
      await loginPage.fillLoginData(process.env.EMAIL, loginCredentials.PASSWORD_INVALID);
      await loginPage.accountLoginButton.click();
      await verifyPopupMessage(page, validationMessages.LOGIN_INVALID);
    });
    test('@Smoke - User cannot login to account - receives popup message when enters invalid email', async ({page})=> {
      await loginPage.fillLoginData(loginCredentials.EMAIL_INVALID, process.env.PASSWORD);
      await loginPage.accountLoginButton.click();
      await verifyPopupMessage(page, validationMessages.LOGIN_INVALID);
    });
    test('User cannot login to account - receives popup message when enters no email', async ({page})=> {
      await loginPage.fillLoginData(loginCredentials.EMAIL_MISSING, process.env.PASSWORD);
      await loginPage.accountLoginButton.click();
      await verifyPopupMessage(page, validationMessages.EMAIL_MISSING);
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