import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly loginPageTitle: Locator;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly accountLoginButton: Locator;
    readonly popupMessage: Locator;
    readonly exitButton: Locator;
    readonly linkToRegistration: Locator;
    readonly registerFormTitle: Locator;
    readonly profilePicture: Locator;
    readonly profileDropdownMenu: Locator;
    readonly profileDropdownLogout: Locator;

constructor(page: Page) {
    this.page = page;
    this.loginPageTitle = page.getByText('Login To Your Account')
    this.emailField = page.getByLabel('Email')
    this.passwordField = page.getByLabel('Password');
    this.accountLoginButton = page.getByRole('button', { name: 'Login', exact: true});
    this.popupMessage = page.locator('.popupMessage');
    this.exitButton = page.locator('a.exitButton');
    this.linkToRegistration = page.getByText('Register by clicking here');
    this.profilePicture = page.getByAltText("An icon of a person's profile view");
    this.profileDropdownMenu = page.locator('.userManagementButton .dropdownMenu');
    this.profileDropdownLogout = page.locator('.dropdownItem p:has-text("Logout")');
};

async fillLoginData (email: string, password: string){
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
};

async loginToAccount(){
    await this.fillLoginData(process.env.EMAIL, process.env.PASSWORD);
    await this.accountLoginButton.click();
};

async clickLoginAndReceivePopupMessage(message){
    await this.accountLoginButton.click();
    await expect(this.popupMessage).toBeVisible();
    await expect(this.popupMessage).toHaveText(message); 
};
}

export default LoginPage;