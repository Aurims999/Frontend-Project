import { test, expect } from '@playwright/test';

test.beforeEach(async({page})=>{
  await page.goto('http://localhost:5173/');
})

test('Guest page loaded', async ({ page }) => {
  const pageTitle = page.getByText('Elevate Your Mood, One Track at a Time');
  // const pageTitle2 = page.locator('.description h1');
  await expect(pageTitle).toHaveText('Elevate Your Mood, One Track at a Time');
});

test('Login Button redirects to login page', async ({page})=>{
  const loginButton = page.getByRole('link', {name: 'Login'});
  await loginButton.click();

})