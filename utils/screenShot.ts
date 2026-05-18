import { Page } from '@playwright/test';

export async function captureScreenshot(
  page: Page,
  fileName: string
) {

  await page.screenshot({
    path: `screenshots/${fileName}.png`,
    fullPage: true
  });
}