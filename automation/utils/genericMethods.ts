import { Page, expect } from '@playwright/test';

export async function verifyPopupMessage(page: Page, message: string) {
    const popupMessage = page.locator('.popupMessage');
    await expect(popupMessage).toBeVisible();
    await expect(popupMessage).toHaveText(message);
};

export async function clickExitButton(page: Page) {
    const exitButton = page.locator('a.exitButton');
    await expect(exitButton).toBeVisible();
    await exitButton.click();
};