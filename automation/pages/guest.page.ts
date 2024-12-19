import type { Page, Locator } from '@playwright/test';

export class GuestPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly loginButton: Locator;
    readonly tryOutButton: Locator;

constructor(page:Page){
    this.page = page;
    this.pageTitle = page.getByText('Elevate Your Mood, One Track at a Time');
    this.loginButton = page.getByRole('link', {name: 'Login'});
    this.tryOutButton = page.getByRole('link', {name: 'Try out now!'});
};
};

export default GuestPage;