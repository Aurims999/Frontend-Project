import type { Page, Locator } from '@playwright/test';

export class Page404 {
    readonly page: Page;
    readonly goToHomePageButton: Locator;
    readonly pageTitle: Locator;

constructor(page: Page) {
    this.page = page;
    this.goToHomePageButton = page.getByRole('link', {name: 'Go to Home Page'});
    this.pageTitle = page.locator('h1');
};

async clickGoToHomePage(){
    this.goToHomePageButton.click();
};
};

export default Page404;