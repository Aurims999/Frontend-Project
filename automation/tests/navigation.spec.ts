import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page.ts';
import { GuestPage } from '../pages/guest.page.ts';
import { clickExitButton } from '../utils/genericMethods.ts';
import { Page404 } from '../pages/page404.page.ts';
import { invalidNavigationData } from '../test-data/navigation_data.js';

let loginPage: LoginPage;
let guestPage: GuestPage;
let page404: Page404;

test.describe('Go back to Guest page by clicking Exit Button', ()=> {
    test.use({storageState: { cookies: [], origins: [] }});
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

test.describe('VB-36 - invalid navigation tests with authenticated user ', ()=> {
    invalidNavigationData.forEach(({description, inaccessibleURL}) => {
        test(description, async ({page}) => {
            await page.goto(inaccessibleURL);
            page404 = new Page404 (page);
            await expect(page404.pageTitle).toHaveText('404');
            await page404.goToHomePageButton.click();
            await expect(page).toHaveURL('/');
        });
    });
});

test.describe('Invalid navigation with Guest user ', ()=> {
    test.use({storageState: { cookies: [], origins: [] }});
    test('VB-36 - When guest user enters invalid url, and is redirected to 404 page, user is able to go back to Guest page', async({page})=> {
        await page.goto('/shopping');
        page404 = new Page404 (page);
        await expect(page404.pageTitle).toHaveText('404');
        await page404.goToHomePageButton.click();
        await expect(page).toHaveURL('/guest');
    });
});