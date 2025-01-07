import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page.ts';
import { GuestPage } from '../pages/guest.page.ts';
import { HomePage} from '../pages/home.page.ts';
import { searchSubstring } from '../test-data/home_page_data.js';

    let loginPage: LoginPage;
    let guestPage: GuestPage;
    let homePage: HomePage;

    test.describe('Search basic function', () => {
        test.beforeEach(async({page})=>{
            await page.goto('/');
            guestPage = new GuestPage(page);
            loginPage = new LoginPage(page);
            await guestPage.loginButton.click();
            await loginPage.fillLoginData(process.env.EMAIL, process.env.PASSWORD);
            await loginPage.accountLoginButton.click();
            await expect(loginPage.profilePicture).toBeVisible();
            homePage = new HomePage(page);
            }); 

    test('User can see matching search results', async({})=>{
        await homePage.fillSearchBox(searchSubstring.SUBSTRING);
        await homePage.checkSearchResults(searchSubstring.SUBSTRING);
    });

    test('User can find an artist by entering only one word of two into search field', async({})=>{
        await homePage.fillSearchBox(searchSubstring.ARTIST_PART_OF_NAME);
        await homePage.checkSearchResults(searchSubstring.ARTIST_FULL_NAME);
    });

    test('Verify search results are not displayed if there is no matching results', async({})=>{
        await homePage.fillSearchBox(searchSubstring.SUBSTRING_NOT_MATCHING);
        await expect(homePage.searchItemsList).not.toBeVisible();
    });
});