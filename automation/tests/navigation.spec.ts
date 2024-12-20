import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page.ts';
import { GuestPage } from '../pages/guest.page.ts';
import { clickExitButton } from '../utils/genericMethods.ts';

let loginPage: LoginPage;
let guestPage: GuestPage;

test.describe('Go back to Guest page by clicking Exit Button', ()=> {
    test.beforeEach(async({page})=>{
        await page.goto('/');
        guestPage = new GuestPage(page);
        loginPage = new LoginPage(page);
        await guestPage.loginButton.click();
     });
    test('Go back to Guest page from Login page by clicking Exit Button', async({page})=> {
        await clickExitButton(page);
        await expect(guestPage.pageTitle).toHaveText('Elevate Your Mood, One Track at a Time');
    });
    test('Exit Registration Form and return to Guest page by clicking Exit Button', async({page})=> {
        await loginPage.linkToRegistration.click();
        await clickExitButton(page);
        await expect(guestPage.pageTitle).toHaveText('Elevate Your Mood, One Track at a Time');
    });
});