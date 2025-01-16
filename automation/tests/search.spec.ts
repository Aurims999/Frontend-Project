import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page.ts';
import { GuestPage } from '../pages/guest.page.ts';
import { Header} from '../components/header.ts';
import { searchSubstring } from '../test-data/header_data.js';

let loginPage: LoginPage;
let guestPage: GuestPage;
let header: Header;

test.describe('Search basic function', () => {
    test.beforeEach( async ({page}) => {
        await page.goto('/');
        header = new Header(page);
    }); 

    test('User can see matching search results', async()=>{
        await header.fillSearchBox(searchSubstring.SUBSTRING);
        await header.checkSearchResults(searchSubstring.SUBSTRING);
    });

    test('User can find an artist by entering only one word of two into search field', async()=>{
        await header.fillSearchBox(searchSubstring.ARTIST_PART_OF_NAME);
        await header.checkSearchResults(searchSubstring.ARTIST_FULL_NAME);
    });

    test('Verify search results are not displayed if there is no matching results', async()=>{
        await header.fillSearchBox(searchSubstring.SUBSTRING_NOT_MATCHING);
        await expect(header.searchItemsList).not.toBeVisible();
    });
});