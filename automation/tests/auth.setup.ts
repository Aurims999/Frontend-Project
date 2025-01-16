import { expect, test as setup } from '@playwright/test';
import LoginPage from '../pages/login.page';
import GuestPage from '../pages/guest.page';

setup('Authenticating User and Storing Authentication Data to JSON File', async ({ page }) => {
  const guestPage = new GuestPage(page);
  const loginPage = new LoginPage(page);

  await page.goto('/guest');
  await guestPage.loginButton.click();
  await loginPage.loginToAccount();
  await expect(loginPage.profilePicture).toBeVisible();

  await page.context().storageState({ path: 'automation/.auth.json' });
});
