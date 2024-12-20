import { test, expect } from '@playwright/test';
import { RegistrationFormPage } from '../../pages/registrationForm.page.ts';
import { LoginPage } from '../../pages/login.page.ts';
import { GuestPage } from '../../pages/guest.page.ts';
import { registrationData} from '../../test-data/authentication_page_data.js';
import { generateRandomString } from '../../utils/services/creatingData.ts';
import { randomEmail } from '../../utils/services/creatingData.ts';
import { validationMessages } from '../../../src/utils/messages/popupMessages.js';
import { verifyPopupMessage } from '../../utils/genericMethods.ts';

  let registrationFormPage: RegistrationFormPage;
  let loginPage: LoginPage;
  let guestPage: GuestPage;

  test.beforeEach(async({page})=>{
      await page.goto('/');
    guestPage = new GuestPage(page);
    loginPage = new LoginPage(page);
    registrationFormPage = new RegistrationFormPage(page);
      await guestPage.tryOutButton.click();
      await loginPage.linkToRegistration.click();
    });

  test.describe('@VB-11 - Registration form. Input validation popup messages', () => {
    test('@Smoke - User is able to create a new account successfully', async ()=> {
      await registrationFormPage.fillRegistrationForm(generateRandomString(6), randomEmail, registrationData.PASSWORD_VALID, registrationData.PASSWORD_VALID);
      await registrationFormPage.createAccountButton.click();
      await expect(loginPage.profilePicture).toBeVisible();
    });
    test('User cannot create new account when enters email which is already taken', async ({page})=> {
      await registrationFormPage.fillRegistrationForm(generateRandomString(6), process.env.EMAIL, process.env.PASSWORD, process.env.PASSWORD);
      await registrationFormPage.createAccountButton.click();
      await verifyPopupMessage(page, validationMessages.EMAIL_TAKEN);
    });
    test('User cannot create new account when enters email which has invalid format', async ({page})=> {
      await registrationFormPage.fillRegistrationForm(generateRandomString(6), registrationData.EMAIL_WRONG_FORMAT, registrationData.PASSWORD_VALID, registrationData.PASSWORD_VALID);
      await registrationFormPage.createAccountButton.click();
      await verifyPopupMessage(page, validationMessages.EMAIL_INVALID);
    });
    test('User cannot create new account when enters no username in registration form', async ({page})=> {
      await registrationFormPage.fillRegistrationForm(registrationData.USERNAME_MISSING, randomEmail, registrationData.PASSWORD_VALID, registrationData.PASSWORD_VALID);
      await registrationFormPage.createAccountButton.click();
      await verifyPopupMessage(page, validationMessages.USERNAME_MISSING);
    });
    test('User cannot create new account when enters username which is too short', async ({page})=> {
      await registrationFormPage.fillRegistrationForm(registrationData.USERNAME_SHORT, randomEmail, registrationData.PASSWORD_VALID, registrationData.PASSWORD_VALID);
      await registrationFormPage.createAccountButton.click();
      await verifyPopupMessage(page, validationMessages.USERNAME_SHORT);
    });
    test('User cannot create new account when enters mismatching passwords', async ({page})=> {
      await registrationFormPage.fillRegistrationForm(generateRandomString(6), randomEmail, registrationData.PASSWORD_VALID, registrationData.PASSWORD_SHORT);
      await registrationFormPage.createAccountButton.click();
      await verifyPopupMessage(page, validationMessages.PASSWORD_MISMATCH);
    });
    test('User cannot create new account when enters password which is too short', async ({page})=> {
      await registrationFormPage.fillRegistrationForm(generateRandomString(8), randomEmail, registrationData.PASSWORD_SHORT, registrationData.PASSWORD_SHORT);
      await registrationFormPage.createAccountButton.click();
      await verifyPopupMessage(page, validationMessages.PASSWORD_SHORT);
    });
  });