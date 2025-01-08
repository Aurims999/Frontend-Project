import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';

export class HeaderPage {
    readonly page: Page;
    readonly searchInput: Locator;
    readonly searchItemsList: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.locator('input.searchBar');
        this.searchItemsList = page.getByRole('listitem');
    };

    async fillSearchBox(substring: string) {
        await this.searchInput.click();
        await this.searchInput.fill(substring);
    };

    async checkSearchResults(searchResult: string) {
        const listItems = await this.searchItemsList.all();
            for (const item of listItems) {
                const text = await item.textContent();
                await expect(text.toLowerCase()).toContain(searchResult.toLowerCase());
            };
    }
};

export default HeaderPage;