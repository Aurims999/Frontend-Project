import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page.ts';
import { GuestPage } from '../pages/guest.page.ts';
import { HeaderPage} from '../pages/header.page.ts';
import { searchSubstring } from '../test-data/header_page_data.js';

    let loginPage: LoginPage;
    let guestPage: GuestPage;
    let headerPage: HeaderPage;

    test.describe('Search basic function', () => {
        test.beforeEach(async({page})=>{
            await page.goto('/');
            guestPage = new GuestPage(page);
            loginPage = new LoginPage(page);
            await guestPage.loginButton.click();
            await loginPage.fillLoginData(process.env.EMAIL, process.env.PASSWORD);
            await loginPage.accountLoginButton.click();
            await expect(loginPage.profilePicture).toBeVisible();
            headerPage = new HeaderPage(page);
            }); 

    test('User can see matching search results', async({})=>{
        await headerPage.fillSearchBox(searchSubstring.SUBSTRING);
        await headerPage.checkSearchResults(searchSubstring.SUBSTRING);
    });

    test('User can find an artist by entering only one word of two into search field', async({})=>{
        await headerPage.fillSearchBox(searchSubstring.ARTIST_PART_OF_NAME);
        await headerPage.checkSearchResults(searchSubstring.ARTIST_FULL_NAME);
    });

    test('Verify search results are not displayed if there is no matching results', async({})=>{
        await headerPage.fillSearchBox(searchSubstring.SUBSTRING_NOT_MATCHING);
        await expect(headerPage.searchItemsList).not.toBeVisible();
    });
});