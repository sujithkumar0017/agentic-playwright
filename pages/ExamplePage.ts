import { Page, Locator } from '@playwright/test';

const exampleHtml = `
  <main>
    <h1>Example App</h1>
    <label for="name">Name</label>
    <input id="name" />
    <button onclick="document.getElementById('greeting').textContent = 'Hello, ' + document.getElementById('name').value + '!'">
      Greet
    </button>
    <p id="greeting" role="status"></p>
  </main>
`;

export class ExamplePage {
  readonly page: Page;
  readonly heading: Locator;
  readonly nameInput: Locator;
  readonly greetButton: Locator;
  readonly greeting: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Example App' });
    this.nameInput = page.getByLabel('Name');
    this.greetButton = page.getByRole('button', { name: 'Greet' });
    this.greeting = page.getByRole('status');
  }

  async open() {
    // Self-contained demo page so the template passes without a real app.
    // For a real application, replace this with: await this.page.goto('/your-path');
    await this.page.setContent(exampleHtml);
  }

  async greet(name: string) {
    await this.nameInput.fill(name);
    await this.greetButton.click();
  }
}
