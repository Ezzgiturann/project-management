import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should display login form when not authenticated', async ({ page }) => {
    await page.goto('/');
    
    // Check if the login form is visible
    await expect(page.locator('h1')).toHaveText('Sign in');
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toHaveText('Sign in');
  });

  test('should show error with invalid credentials', async ({ page }) => {
    await page.goto('/');
    
    await page.locator('label', { hasText: 'Email' }).locator('input').fill('wrong@example.com');
    await page.fill('input[type="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');

    // Wait for error message (assuming the API returns an error)
    await expect(page.locator('.auth-error')).toBeVisible();
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await page.goto('/');
    
    // Using the demo credentials from the UI
    const emailInput = page.locator('label', { hasText: 'Email' }).locator('input');
    await emailInput.fill('admin@taskflow.local');
    
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button[type="submit"]');

    // Should redirect to dashboard and show the sidebar or overview
    await expect(page.locator('aside.sidebar')).toBeVisible();
    await expect(page.locator('h1').first()).toHaveText('Project Dashboard');
  });
});
