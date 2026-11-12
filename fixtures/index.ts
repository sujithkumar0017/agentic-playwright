import { test as base } from '@playwright/test';
import { ExamplePage } from '../pages/ExamplePage';

type PageObjects = {
  examplePage: ExamplePage;
};

export const test = base.extend<PageObjects>({
  examplePage: async ({ page }, use) => {
    await use(new ExamplePage(page));
  },
});

export { expect } from '@playwright/test';
