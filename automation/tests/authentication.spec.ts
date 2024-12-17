import { test, expect, } from '@playwright/test';
import { AuthenticationPage } from '../pages/authentication.page.ts';
import dotenv from 'dotenv';
dotenv.config();
import { loginCredentials } from '../test-data/authentication_page_data.js';
import { EmailAuthCredential } from 'firebase/auth/web-extension';
import { registrationData} from '../test-data/authentication_page_data.js';
import { randomString } from '../utils/services/creatingData.ts';
import { randomEmail } from '../utils/services/creatingData.ts';

let authenticationPage: AuthenticationPage;



test.beforeEach(async({page})=>{
  await page.goto('/');
   authenticationPage = new AuthenticationPage(page);
});

test.describe('@VB-31 - Navigation to/from login page, and navigation to registration form', ()=> {
  test('@Smoke - Login Button redirects to login page', async ({page})=> {
    await expect(authenticationPage.pageTitle).toHaveText('Elevate Your Mood, One Track at a Time');
    await authenticationPage.loginButton.click();
    await expect(authenticationPage.loginPageTitle).toHaveText('Login To Your Account');
  });
    test('TryOutNow Button redirects to login page', async ({page})=> {
      await authenticationPage.tryOutButton.click();
      await expect(authenticationPage.loginPageTitle).toHaveText('Login To Your Account');
  });
    test('@Smoke - Exit Button redirects to guest page', async ({page})=> {
      await authenticationPage.loginButton.click();
      await authenticationPage.exitButton.click();
      await expect(authenticationPage.pageTitle).toHaveText('Elevate Your Mood, One Track at a Time');
  });
  test('@Smoke - Verify link \Register by clicking here\ redirects to Registration Form', async ({page})=> {
    await authenticationPage.loginButton.click();
    await authenticationPage.linkToRegistration.click();
    await expect(authenticationPage.registerFormTitle).toHaveText('Register New Account');
  });
  test('Exit Button from registration form redirects to guest page', async ({page})=> {
    await authenticationPage.navigateToRegistrationForm();
    await authenticationPage.exitButton.click();
      await expect(authenticationPage.pageTitle).toHaveText('Elevate Your Mood, One Track at a Time');
  })
})

test.describe('@VB-10 - Login. Input validation popup messages', () => {
   test('@Smoke - Successful login', async ({page}) => {
    await authenticationPage.loginButton.click();
    await authenticationPage.fillLoginData(process.env.EMAIL!, process.env.PASSWORD!);
    await authenticationPage.accountLoginButton.click();
    await expect(page.getByAltText("An icon of a person's profile view")).toBeVisible();
  });
  test('Missing password login - valid email, no password', async ({page})=> {
    await authenticationPage.loginButton.click();
    await authenticationPage.fillLoginData(process.env.EMAIL!, loginCredentials.PASSWORD_MISSING);
    await authenticationPage.accountLoginButton.click();
    await expect(authenticationPage.popupMessage).toBeVisible();
    await expect(authenticationPage.popupMessage).toHaveText("You forgot to provide your password!");
  });
  test('@Smoke - Invalid login - valid email, invalid password', async ({page})=> {
    await authenticationPage.loginButton.click();
    await authenticationPage.fillLoginData(process.env.EMAIL!, loginCredentials.PASSWORD_INVALID);
    await authenticationPage.accountLoginButton.click();
    await expect(authenticationPage.popupMessage).toBeVisible();
    await expect(authenticationPage.popupMessage).toHaveText("Wrong login data! Check your credentials");
  });
  test('@Smoke - Invalid login - invalid email, valid password', async ({page})=> {
    await authenticationPage.loginButton.click();
    await authenticationPage.fillLoginData(loginCredentials.EMAIL_INVALID, process.env.PASSWORD!);
    await authenticationPage.accountLoginButton.click();
    await expect(authenticationPage.popupMessage).toBeVisible();
    await expect(authenticationPage.popupMessage).toHaveText("Wrong login data! Check your credentials");
  });
  test('Missing email login - no email, valid password', async ({page})=> {
    await authenticationPage.loginButton.click();
    await authenticationPage.fillLoginData(loginCredentials.EMAIL_MISSING, process.env.PASSWORD!);
    await authenticationPage.accountLoginButton.click();
    await expect(authenticationPage.popupMessage).toBeVisible();
    await expect(authenticationPage.popupMessage).toHaveText("You forgot to provide your email!");
  });
});

test.describe('@VB-11 - Registration form. Input validation popup messages', () => {
    test('@Smoke - Verify if new account created successfully', async ({page})=> {
    await authenticationPage.navigateToRegistrationForm();
    await authenticationPage.fillRegistrationForm(randomString, randomEmail, registrationData.PASSWORD_VALID, registrationData.PASSWORD_VALID);
    await authenticationPage.createAccountButton.click();
    await expect(page.getByAltText("An icon of a person's profile view")).toBeVisible();
  });
  test('Verify account cannot be created when email used is already taken', async ({page})=> {
    await authenticationPage.navigateToRegistrationForm();
    await authenticationPage.fillRegistrationForm(randomString, process.env.EMAIL!, process.env.PASSWORD!, process.env.PASSWORD!);
    await authenticationPage.createAccountButton.click();
    await expect(authenticationPage.popupMessage).toBeVisible();
    await expect(authenticationPage.popupMessage).toHaveText('This email is already used by other account');
  });

  test('Verify account cannot be created when email has invalid format', async ({page})=> {
    await authenticationPage.navigateToRegistrationForm();
    await authenticationPage.fillRegistrationForm(randomString, registrationData.EMAIL_WRONG_FORMAT, registrationData.PASSWORD_VALID, registrationData.PASSWORD_VALID);
    await authenticationPage.createAccountButton.click();
    await expect(authenticationPage.popupMessage).toBeVisible();
    await expect(authenticationPage.popupMessage).toHaveText('Invalid email format!');
  });

  test('Verify account cannot be created when username is missing', async ({page})=> {
    await authenticationPage.navigateToRegistrationForm();
    await authenticationPage.fillRegistrationForm(registrationData.USERNAME_MISSING, randomEmail, registrationData.PASSWORD_VALID, registrationData.PASSWORD_VALID);
    await authenticationPage.createAccountButton.click();
    await expect(authenticationPage.popupMessage).toBeVisible();
    await expect(authenticationPage.popupMessage).toHaveText('You forgot to provide your username');
  });

  test('Verify account cannot be created when username is too short', async ({page})=> {
    await authenticationPage.navigateToRegistrationForm();
    await authenticationPage.fillRegistrationForm(registrationData.USERNAME_SHORT, randomEmail, registrationData.PASSWORD_VALID, registrationData.PASSWORD_VALID);
    await authenticationPage.createAccountButton.click();
    await expect(authenticationPage.popupMessage).toBeVisible();
    await expect(authenticationPage.popupMessage).toHaveText('Your username has to have at least 5 characters');
  });

  test('Verify account cannot be created when passwords mismatch', async ({page})=> {
    await authenticationPage.navigateToRegistrationForm();
    await authenticationPage.fillRegistrationForm(randomString, randomEmail, registrationData.PASSWORD_VALID, registrationData.PASSWORD_SHORT);
    await authenticationPage.createAccountButton.click();
    await expect(authenticationPage.popupMessage).toBeVisible();
    await expect(authenticationPage.popupMessage).toHaveText('Your passwords do not match!');
  });
  test('Verify account cannot be created when password is too short', async ({page})=> {
    await authenticationPage.navigateToRegistrationForm();
    await authenticationPage.fillRegistrationForm(randomString, randomEmail, registrationData.PASSWORD_SHORT, registrationData.PASSWORD_SHORT);
    await authenticationPage.createAccountButton.click();
    await expect(authenticationPage.popupMessage).toBeVisible();
    await expect(authenticationPage.popupMessage).toHaveText('Your password must contain at least 6 symbols');
  });
});

test.describe('@VB-32 - Logout', ()=> {
    test('@Smoke - check logout function', async ({page})=> {
    await authenticationPage.loginToAccount();
    await expect(authenticationPage.profilePicture).toBeVisible();
    await authenticationPage.profilePicture.click();
    await expect(authenticationPage.profileDropdownMenu).toBeVisible();
    await page.locator('.dropdownItem p:has-text("Logout")').click();
    await expect(authenticationPage.pageTitle).toHaveText('Elevate Your Mood, One Track at a Time');
    await page.goBack();
    await expect(authenticationPage.pageTitle).toHaveText('Elevate Your Mood, One Track at a Time');
  });
});
