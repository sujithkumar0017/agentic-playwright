import { test, expect } from '../fixtures';
import { exampleUser } from '../test-data/example.data';

test.describe('Example', () => {
  test('TC_EXAMPLE_001 should greet the user by name', async ({ examplePage }) => {
    await examplePage.open();
    await expect(examplePage.heading).toBeVisible();

    await examplePage.greet(exampleUser.name);

    await expect(examplePage.greeting).toHaveText(`Hello, ${exampleUser.name}!`);
  });
});
