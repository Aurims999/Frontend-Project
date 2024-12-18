import { test, expect } from '@playwright/test';
import { AuthenticationPage } from '../pages/authentication.page.ts';
import { loginCredentials } from '../test-data/authentication_page_data.js';
import { registrationData} from '../test-data/authentication_page_data.js';
import { generateRandomString } from '../utils/services/creatingData.ts';
import { randomEmail } from '../utils/services/creatingData.ts';

let authenticationPage: AuthenticationPage;

test.beforeEach(async({page})=>{
  await page.goto('/');
   authenticationPage = new AuthenticationPage(page);
});

test.describe('@VB-31 - Navigation to/from login page, and navigation to registration form', ()=> {
  test('@Smoke - Go to Login page from Guest page by clicking Login Button', async ({page})=> {
    await expect(authenticationPage.pageTitle).toHaveText('Elevate Your Mood, One Track at a Time');
    await authenticationPage.loginButton.click();
    await expect(authenticationPage.loginPageTitle).toHaveText('Login To Your Account');
  });
    test('Go to Login page from Guest page by clicking TryOutNow Button', async ({page})=> {
      await authenticationPage.tryOutButton.click();
      await expect(authenticationPage.loginPageTitle).toHaveText('Login To Your Account');
  });
    test('@Smoke - Exit Login page to Guest page by clicking Exit Button', async ({page})=> {
      await authenticationPage.loginButton.click();
      await authenticationPage.exitButton.click();
      await expect(authenticationPage.pageTitle).toHaveText('Elevate Your Mood, One Track at a Time');
  });
  test('@Smoke - Go to Registration Form from Login page by clicking link "Register by clicking here"', async ({page})=> {
    await authenticationPage.loginButton.click();
    await authenticationPage.linkToRegistration.click();
    await expect(authenticationPage.registerFormTitle).toHaveText('Register New Account');
  });
  test('Go back to Guest page from registration form by clicking Exit Button ', async ({page})=> {
    await authenticationPage.navigateToRegistrationForm();
    await authenticationPage.exitButton.click();
      await expect(authenticationPage.pageTitle).toHaveText('Elevate Your Mood, One Track at a Time');
  })
})

test.describe('@VB-10 - Login. Input validation popup messages', () => {
   test('@Smoke - User is  able to login to account successfully', async ({page}) => {
    await authenticationPage.goToLoginPageAndFillLoginData(process.env.EMAIL, process.env.PASSWORD);
    await authenticationPage.accountLoginButton.click();
    await expect(page.getByAltText("An icon of a person's profile view")).toBeVisible();
  });
  test('User cannot login to account and receives popup message when enters no password', async ({page})=> {
    await authenticationPage.goToLoginPageAndFillLoginData(process.env.EMAIL, loginCredentials.PASSWORD_MISSING);
    await authenticationPage.clickLoginAndReceivePopupMessage("You forgot to provide your password!");
  });
  test('@Smoke - User cannot login to account and receives popup message when enters invalid password', async ({page})=> {
    await authenticationPage.goToLoginPageAndFillLoginData(process.env.EMAIL, loginCredentials.PASSWORD_INVALID);
    await authenticationPage.clickLoginAndReceivePopupMessage("Wrong login data! Check your credentials");
  });
  test('@Smoke - User cannot login to account and receives popup message when enters invalid email', async ({page})=> {
    await authenticationPage.goToLoginPageAndFillLoginData(loginCredentials.EMAIL_INVALID, process.env.PASSWORD);
    await authenticationPage.clickLoginAndReceivePopupMessage("Wrong login data! Check your credentials");
  });
  test('User cannot login to account and receives popup message when enters no email', async ({page})=> {
    await authenticationPage.loginButton.click();
    await authenticationPage.fillLoginData(loginCredentials.EMAIL_MISSING, process.env.PASSWORD);
    await authenticationPage.clickLoginAndReceivePopupMessage("You forgot to provide your email!");
  });
});

test.describe('@VB-11 - Registration form. Input validation popup messages', () => {
    test('@Smoke - User is able to create a new account successfully', async ({page})=> {
    await authenticationPage.goToRegistrationFormAndCreateAccount(generateRandomString(6), randomEmail, registrationData.PASSWORD_VALID, registrationData.PASSWORD_VALID);
    await expect(page.getByAltText("An icon of a person's profile view")).toBeVisible();
  });
  test('User cannot create new account when enters email which is already taken', async ({page})=> {
    await authenticationPage.goToRegistrationFormAndCreateAccount(generateRandomString(6), process.env.EMAIL, process.env.PASSWORD, process.env.PASSWORD);
    await expect(authenticationPage.popupMessage).toBeVisible();
    await expect(authenticationPage.popupMessage).toHaveText('This email is already used by other account');
  });
  test('User cannot create new account when enters email which has invalid format', async ({page})=> {
    await authenticationPage.goToRegistrationFormAndCreateAccount(generateRandomString(6), registrationData.EMAIL_WRONG_FORMAT, registrationData.PASSWORD_VALID, registrationData.PASSWORD_VALID);
    await expect(authenticationPage.popupMessage).toBeVisible();
    await expect(authenticationPage.popupMessage).toHaveText('Invalid email format!');
  });
  test('User cannot create new account when enters no username in registration form', async ({page})=> {
    await authenticationPage.goToRegistrationFormAndCreateAccount(registrationData.USERNAME_MISSING, randomEmail, registrationData.PASSWORD_VALID, registrationData.PASSWORD_VALID);
    await expect(authenticationPage.popupMessage).toBeVisible();
    await expect(authenticationPage.popupMessage).toHaveText('You forgot to provide your username');
  });
  test('User cannot create new account when enters username which is too short', async ({page})=> {
    await authenticationPage.goToRegistrationFormAndCreateAccount(registrationData.USERNAME_SHORT, randomEmail, registrationData.PASSWORD_VALID, registrationData.PASSWORD_VALID);
    await expect(authenticationPage.popupMessage).toBeVisible();
    await expect(authenticationPage.popupMessage).toHaveText('Your username has to have at least 5 characters');
  });
  test('User cannot create new account when enters mismatching passwords', async ({page})=> {
    await authenticationPage.goToRegistrationFormAndCreateAccount(generateRandomString(6), randomEmail, registrationData.PASSWORD_VALID, registrationData.PASSWORD_SHORT);
    await expect(authenticationPage.popupMessage).toBeVisible();
    await expect(authenticationPage.popupMessage).toHaveText('Your passwords do not match!');
  });
  test('User cannot create new account when enters password which is too short', async ({page})=> {
    await authenticationPage.goToRegistrationFormAndCreateAccount(generateRandomString(8), randomEmail, registrationData.PASSWORD_SHORT, registrationData.PASSWORD_SHORT);
    await expect(authenticationPage.popupMessage).toBeVisible();
    await expect(authenticationPage.popupMessage).toHaveText('Your password must contain at least 6 symbols');
  });
});

test.describe('@VB-32 - Logout', ()=> {
    test('@Smoke - User can logout from the account successfully, and his information is not accessible after logging out', async ({page})=> {
    await authenticationPage.loginToAccount();
    await expect(authenticationPage.profilePicture).toBeVisible();
    await authenticationPage.profilePicture.click();
    await expect(authenticationPage.profileDropdownMenu).toBeVisible();
    await authenticationPage.profileDropdownLogout.click();
    await expect(authenticationPage.pageTitle).toHaveText('Elevate Your Mood, One Track at a Time');
    await page.goBack();
    await expect(authenticationPage.pageTitle).toHaveText('Elevate Your Mood, One Track at a Time');
  });
});