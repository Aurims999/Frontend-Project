import type { Page, Locator } from '@playwright/test';

export class RegistrationFormPage {
    readonly page: Page;
    readonly regUsernameField: Locator;
    readonly regEmailField: Locator;
    readonly regPasswordField: Locator;
    readonly regConfirmPasswordF: Locator;
    readonly createAccountButton: Locator;
    
constructor(page:Page){
    this.page = page;
    this.regUsernameField = page.getByLabel('Username');
    this.regEmailField = page.getByLabel('Email');
    this.regPasswordField = page.getByPlaceholder('Create a strong password');
    this.regConfirmPasswordF = page.getByLabel('Confirm Your Password');
    this.createAccountButton = page.getByRole('button', {name: 'Create New Account'});
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
}