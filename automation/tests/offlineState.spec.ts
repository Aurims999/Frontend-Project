import { test, expect } from '@playwright/test';

test.describe('When user goes offline', () => {
    test('User should see informative popup when goes offline. The popup disappears after connection is restored', async({page})=> {
        await page.goto('/');
        await page.context().setOffline(true);
        const noInternetConnection = page.locator('.infoBlock');
        await expect (noInternetConnection).toHaveScreenshot();
        await page.context().setOffline(false);
        await expect(noInternetConnection).not.toBeVisible();
    });
});