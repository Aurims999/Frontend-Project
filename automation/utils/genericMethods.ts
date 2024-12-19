import { Page, expect } from '@playwright/test';

export async function verifyPopupMessage(page: Page, message: string) {
    const popupMessage = page.locator('.popupMessage');
    await expect(popupMessage).toBeVisible();
    await expect(popupMessage).toHaveText(message);
};