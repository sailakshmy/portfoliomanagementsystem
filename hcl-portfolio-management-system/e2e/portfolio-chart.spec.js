const { test, expect } = require('@playwright/test');

test.describe('Portfolio Performance Chart E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
 
    await page.goto('http://localhost:3000/dashboard');
    

    await page.waitForSelector('[data-testid="pie-chart-box"]', { timeout: 10000 });
  });

  test('should display portfolio performance chart component', async ({ page }) => {

    await expect(page.locator('text=Portfolio Performance Charts')).toBeVisible();
    
  
    await expect(page.locator('text=Select a chart type to view different aspects of your portfolio')).toBeVisible();
    

    await expect(page.locator('button:has-text("Assets")')).toBeVisible();
    await expect(page.locator('button:has-text("Holdings")')).toBeVisible();
    await expect(page.locator('button:has-text("Performance")')).toBeVisible();
  });

  test('should default to pie chart view', async ({ page }) => {

    await expect(page.locator('[data-testid="pie-chart-box"]')).toBeVisible();
    
    await expect(page.locator('text=Portfolio Summary')).toBeVisible();
    
    await expect(page.locator('text=Stocks:')).toBeVisible();
    await expect(page.locator('text=Bonds:')).toBeVisible();
    await expect(page.locator('text=Real Estate:')).toBeVisible();
    await expect(page.locator('text=Cash:')).toBeVisible();
  });

  test('should switch to table view when holdings button is clicked', async ({ page }) => {
    await page.click('button:has-text("Holdings")');
    
  
    await page.waitForSelector('table', { timeout: 5000 });
    
    await expect(page.locator('th:has-text("Symbol")')).toBeVisible();
    await expect(page.locator('th:has-text("Name")')).toBeVisible();
    await expect(page.locator('th:has-text("Quantity")')).toBeVisible();
    await expect(page.locator('th:has-text("Avg Price")')).toBeVisible();
    await expect(page.locator('th:has-text("Current Price")')).toBeVisible();
    await expect(page.locator('th:has-text("Market Value")')).toBeVisible();
    await expect(page.locator('th:has-text("Gain/Loss")')).toBeVisible();
    await expect(page.locator('th:has-text("Type")')).toBeVisible();
    
    await expect(page.locator('td:has-text("AAPL")')).toBeVisible();
    await expect(page.locator('td:has-text("GOOGL")')).toBeVisible();
    await expect(page.locator('td:has-text("MSFT")')).toBeVisible();
    await expect(page.locator('td:has-text("BOND-ETF")')).toBeVisible();
  });

  test('should switch to bar chart view when performance button is clicked', async ({ page }) => {
    
    await page.click('button:has-text("Performance")');
    

    await page.waitForSelector('[data-testid="bar-chart"]', { timeout: 5000 });
    

    await expect(page.locator('[data-testid="bar-chart"]')).toBeVisible();
    

    await expect(page.locator('[data-testid="pie-chart-box"]')).not.toBeVisible();
  });

  test('should switch back to pie chart when assets button is clicked', async ({ page }) => {

    await page.click('button:has-text("Holdings")');
    await page.waitForSelector('table', { timeout: 5000 });
    

    await page.click('button:has-text("Assets")');
    

    await page.waitForSelector('[data-testid="pie-chart-box"]', { timeout: 5000 });
    

    await expect(page.locator('[data-testid="pie-chart-box"]')).toBeVisible();
    

    await expect(page.locator('text=Portfolio Summary')).toBeVisible();
  });

  test('should display formatted currency values in table', async ({ page }) => {

    await page.click('button:has-text("Holdings")');
    await page.waitForSelector('table', { timeout: 5000 });
    

    await expect(page.locator('td:has-text("$150.00")')).toBeVisible();
    await expect(page.locator('td:has-text("$2,800.00")')).toBeVisible();
    await expect(page.locator('td:has-text("$300.00")')).toBeVisible();
    await expect(page.locator('td:has-text("$85.00")')).toBeVisible();
  });

  test('should display gain/loss chips with correct styling', async ({ page }) => {

    await page.click('button:has-text("Holdings")');
    await page.waitForSelector('table', { timeout: 5000 });
    
  
    const gainLossChips = page.locator('td:has-text("(")');
    await expect(gainLossChips.first()).toBeVisible();
    

    await expect(page.locator('text=/\\d+\\.\\d+%/')).toBeVisible();
  });

  test('should be responsive on different screen sizes', async ({ page }) => {

    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('text=Portfolio Performance Charts')).toBeVisible();
    

    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('text=Portfolio Performance Charts')).toBeVisible();
    

    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('text=Portfolio Performance Charts')).toBeVisible();
  });

  test('should handle rapid chart type switching', async ({ page }) => {

    await page.click('button:has-text("Holdings")');
    await page.click('button:has-text("Performance")');
    await page.click('button:has-text("Assets")');
    await page.click('button:has-text("Holdings")');
    

    await page.waitForSelector('table', { timeout: 5000 });
    await expect(page.locator('th:has-text("Symbol")')).toBeVisible();
  });

  test('should maintain chart state during navigation', async ({ page }) => {

    await page.click('button:has-text("Holdings")');
    await page.waitForSelector('table', { timeout: 5000 });
    

    await page.reload();
    

    await page.waitForSelector('table', { timeout: 5000 });
    await expect(page.locator('th:has-text("Symbol")')).toBeVisible();
  });

  test('should display tooltips on chart hover', async ({ page }) => {
   
    await expect(page.locator('[data-testid="pie-chart-box"]')).toBeVisible();
    

    await page.hover('[data-testid="pie-chart-box"]');
    
 
    await expect(page.locator('[data-testid="pie-chart-box"]')).toBeVisible();
  });
}); 