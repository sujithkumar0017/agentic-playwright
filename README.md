# Agentic Playwright Framework

An AI-powered multi-agent test automation framework built with **Playwright + TypeScript**. Specialized agents generate test cases, review them, turn them into Playwright code, and review that code.

## Features

- Multi-agent architecture (Test Cases, Review, Playwright, Code Review)
- Page Object Model
- Playwright fixtures, with optional authentication storage (storageState)
- Playwright MCP integration with Cursor
- GitHub Actions CI
- Reusable agents that take the application, module and user story as inputs
- Covers Positive, Negative, Edge Case, Functional, and UI scenarios

## Project Structure

```text
agentic-playwright/
├── ai/
│   ├── agents/             # Agent definitions
│   ├── prompts/            # Reusable prompt templates
│   └── orchestration/      # Orchestration guide
├── docs/test-cases/        # Generated test case documents
├── fixtures/               # Custom Playwright fixtures (exports test and expect)
├── pages/                  # Page Objects
├── test-data/              # Test data
├── tests/                  # Test specs
├── utils/                  # Shared helpers
├── .cursor/mcp.json        # Playwright MCP server for Cursor
├── .github/workflows/      # CI pipeline
└── playwright.config.ts
```

## Getting Started

### Prerequisites

- Node.js 18+
- Cursor IDE (recommended)

### Installation

```bash
npm install
npx playwright install
```

### Point the framework at your application

Set the `BASE_URL` environment variable to the application under test:

```bash
# macOS / Linux
BASE_URL=https://your-app.example.com npx playwright test

# Windows PowerShell
$env:BASE_URL = "https://your-app.example.com"; npx playwright test
```

If your application uses a custom test id attribute (for example `data-test`), uncomment `testIdAttribute` in `playwright.config.ts`.

### Run Tests

```bash
npx playwright test             # Run all tests
npx playwright test --headed    # Run with a visible browser
npx playwright test --ui        # Open UI mode
npx playwright show-report      # Open the HTML report
```

## Example Test

`tests/example.spec.ts`, `pages/ExamplePage.ts`, `fixtures/index.ts` and `test-data/example.data.ts` show the expected patterns. The example uses a self-contained demo page, so it passes without any application. Delete or replace these files once you add your own tests, and register your Page Objects in `fixtures/index.ts`.

## Using the Multi-Agent Flow

1. Use the prompt templates in `ai/prompts/`.
2. Follow the orchestration guide in `ai/orchestration/orchestration-guide.md`.
3. Agents generate test cases, review them, write the Playwright code, and review the code.

## Authentication (optional)

To log in once and reuse the session across tests:

1. Create `tests/auth.setup.ts` that logs in and saves the session with `page.context().storageState({ path: 'playwright/.auth/user.json' })`.
2. Uncomment the `setup` project and the `storageState` and `dependencies` lines in `playwright.config.ts`.
3. If some tests need a logged-out browser (for example login tests), run them in a separate project without `storageState`.

`playwright/.auth/` is already in `.gitignore`.

## CI

`.github/workflows/playwright.yml` runs the tests on every push and pull request to `main` or `master`, and uploads the HTML report and test results as artifacts. Set a `BASE_URL` repository variable under **Settings → Secrets and variables → Actions → Variables**.

## License

ISC
