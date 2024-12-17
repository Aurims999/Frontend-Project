import type { Page, Locator } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export class AuthenticationPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly loginButton: Locator;
    readonly loginPageTitle: Locator;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly accountLoginButton: Locator;
    readonly popupMessage: Locator;
    readonly tryOutButton: Locator;
    readonly exitButton: Locator;
    readonly linkToRegistration: Locator;
    readonly registerFormTitle: Locator;
    readonly regUsernameField: Locator;
    readonly regEmailField: Locator;
    readonly regPasswordField: Locator;
    readonly regConfirmPasswordF: Locator;
    readonly createAccountButton: Locator;
    readonly profilePicture: Locator;
    readonly profileDropdownMenu: Locator;

constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.getByText('Elevate Your Mood, One Track at a Time');
    this.loginButton = page.getByRole('link', {name: 'Login'});
    this.loginPageTitle = page.getByText('Login To Your Account')
    this.emailField = page.getByLabel('Email')
    this.passwordField = page.getByLabel('Password');
    this.accountLoginButton = page.getByRole('button', { name: 'Login', exact: true});
    this.popupMessage = page.locator('.popupMessage');
    this.tryOutButton = page.getByRole('link', {name: 'Try out now!'});
    this.exitButton = page.locator('.loginPage .exitButton');
    this.linkToRegistration = page.getByText('Register by clicking here');
    this.registerFormTitle = page.getByText('Register New Account');
    this.regUsernameField = page.getByLabel('Username');
    this.regEmailField = page.getByLabel('Email');
    this.regPasswordField = page.getByPlaceholder('Create a strong password');
    this.regConfirmPasswordF = page.getByLabel('Confirm Your Password');
    this.createAccountButton = page.getByRole('button', {name: 'Create New Account'});
    this.profilePicture = page.getByAltText("An icon of a person's profile view");
    this.profileDropdownMenu = page.locator('.userManagementButton .dropdownMenu');
}

async fillLoginData (email: string, password: string){
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
}

async navigateToRegistrationForm(){
    await this.loginButton.click();
    await this.linkToRegistration.click();
}

async fillRegistrationForm (
    username: string,
    email: string,
    password: string,
    confirmPassword: string
) {
    await this.regUsernameField.fill(username);
    await this.regEmailField.fill(email);
    await this.regPasswordField.fill(password);
    await this.regConfirmPasswordF.fill(confirmPassword);
};

async loginToAccount(){
    await this.loginButton.click();
    await this.fillLoginData(process.env.EMAIL!, process.env.PASSWORD!);
    await this.accountLoginButton.click();
}



}

export default AuthenticationPage;