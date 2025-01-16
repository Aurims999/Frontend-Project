import { test, expect } from '@playwright/test';
import { RegistrationFormPage } from '../../pages/registrationForm.page.ts';
import { LoginPage } from '../../pages/login.page.ts';
import { GuestPage } from '../../pages/guest.page.ts';
import { registrationData} from '../../test-data/authentication_page_data.js';
import { registrationForm_validationTestData } from '../../test-data/authentication_page_data.js';
import { generateRandomString } from '../../utils/services/creatingData.ts';
import { randomEmail } from '../../utils/services/creatingData.ts';
import { verifyPopupMessage } from '../../utils/genericMethods.ts';

let registrationFormPage: RegistrationFormPage;
let loginPage: LoginPage;
let guestPage: GuestPage;

test.use({storageState: { cookies: [], origins: [] }});

test.beforeEach(async({page})=>{
    await page.goto('/');
  guestPage = new GuestPage(page);
  loginPage = new LoginPage(page);
  registrationFormPage = new RegistrationFormPage(page);
    await guestPage.tryOutButton.click();
    await loginPage.linkToRegistration.click();
  });

test.describe('@VB-11 - Registration form', () => {
  test('@Smoke - User is able to create a new account successfully', async ()=> {
    await registrationFormPage.fillRegistrationForm(generateRandomString(6), randomEmail, registrationData.PASSWORD_VALID, registrationData.PASSWORD_VALID);
    await registrationFormPage.createAccountButton.click();
    await expect(loginPage.profilePicture).toBeVisible();
  });
});

test.describe('@VB-33 - Registration input validation popup messages', () => {
  registrationForm_validationTestData.forEach(({description, username, email, password, confirmPassword, expectedPopupMessage}) => {
    test(description, async ({page}) => {
      await registrationFormPage.fillRegistrationForm(username, email, password, confirmPassword);
      await registrationFormPage.createAccountButton.click();
      await verifyPopupMessage(page, expectedPopupMessage);
    });
  });
}); 