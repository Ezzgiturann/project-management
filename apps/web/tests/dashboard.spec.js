import { test, expect } from '@playwright/test';

test.describe('Dashboard and Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Mock login by setting localStorage or just logging in via UI
    await page.goto('/');
    const emailInput = page.locator('label', { hasText: 'Email' }).locator('input');
    await emailInput.fill('admin@taskflow.local');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button[type="submit"]');
    
    // Wait for the dashboard to load
    await expect(page.locator('aside.sidebar')).toBeVisible();
  });

  test('should navigate between tabs', async ({ page }) => {
    // Click on Tasks tab
    await page.click('nav.nav-list button:has-text("Tasks")');
    await expect(page.locator('h1').first()).toHaveText('Tasks');

    // Click on Projects tab
    await page.click('nav.nav-list button:has-text("Projects")');
    await expect(page.locator('h1').first()).toHaveText('Projects');

    // Click on Dashboard tab
    await page.click('nav.nav-list button:has-text("Dashboard")');
    await expect(page.locator('h1').first()).toHaveText('Project Dashboard');
  });

  test('should display summary statistics', async ({ page }) => {
    // On Dashboard, check if stats are visible
    await expect(page.locator('section.hero-panel')).toBeVisible();
    await expect(page.locator('text=Open tasks').first()).toBeVisible();
    await expect(page.locator('text=Active team').first()).toBeVisible();
  });
});
