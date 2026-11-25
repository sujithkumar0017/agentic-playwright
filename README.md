# QA Forge

An AI-powered, multi-agent QA framework template. Clone it to start the QA process for a new project. Specialized agents validate requirements, generate test cases, review them, turn them into automated tests, and review that code.

**Current scope:** UI automation with **Playwright + TypeScript**.
**Planned:** API testing, mobile automation, and load testing.

## Features

- Multi-agent pipeline: Requirement Validation → Test Cases → Test Case Review → Playwright → Code Review
- Change-based test maintenance: when an approved requirement changes, an impact analysis drives updates to only the affected test cases and tests, with permanent TC_IDs and a regression run
- Agents work in Cursor (prompt templates) and in Claude Code (subagents in `.claude/agents/`)
- Page Object Model with Playwright fixtures, and optional authentication storage (`storageState`)
- Playwright MCP integration, so agents can inspect the live application
- Type-checking and ESLint (`eslint-plugin-playwright`) enforce the framework's rules: no hard waits, web-first assertions, no `test.only`
- GitHub Actions CI: type-check, lint, tests, and report artifacts
- Traceability from User Story → validation → test cases (TC_IDs) → spec files → code review
- Covers Positive, Negative, Edge Case, Functional, and UI scenarios

## Project Structure

```text
qa-forge/
├── ai/
│   ├── agents/             # Agent definitions (source of truth)
│   ├── prompts/            # Prompt templates, one per pipeline step
│   └── orchestration/      # Orchestration guide and conventions
├── .claude/agents/         # Claude Code subagents (load ai/agents/*)
├── docs/
│   ├── validation/         # Requirement validation reports
│   ├── test-cases/         # Test case documents
│   └── code-reviews/       # Code review reports
├── fixtures/               # Custom Playwright fixtures (exports test and expect)
├── pages/                  # Page Objects
├── test-data/              # Test data
├── tests/                  # Test specs
├── utils/                  # Shared helpers
├── .cursor/mcp.json        # Playwright MCP server for Cursor
├── .mcp.json               # Playwright MCP server for Claude Code
├── .github/workflows/      # CI pipeline
├── CLAUDE.md               # Project guide for Claude Code
├── eslint.config.mjs
└── playwright.config.ts
```

## Getting Started

### Prerequisites

- Node.js 20+ (CI uses Node 24)
- Cursor or Claude Code (recommended)

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

### Run Tests and Checks

```bash
npm run check                   # Type-check + lint
npx playwright test             # Run all tests
npx playwright test --headed    # Run with a visible browser
npx playwright test --ui        # Open UI mode
npx playwright show-report      # Open the HTML report
```

## Example Test

`tests/example.spec.ts`, `pages/ExamplePage.ts`, `fixtures/index.ts` and `test-data/example.data.ts` show the expected patterns. The example uses a self-contained demo page, so it passes without any application. Delete or replace these files once you add your own tests, and register your Page Objects in `fixtures/index.ts`.

## Using the Multi-Agent Flow

Follow `ai/orchestration/orchestration-guide.md`. In short:

| Step | Agent | Prompt template |
|---|---|---|
| 1 | Requirement Validation | `ai/prompts/validate-requirements.md` |
| 2 | Test Cases | `ai/prompts/generate-test-cases.md` |
| 3 | Test Case Review | `ai/prompts/review-test-cases.md` |
| 4 | Playwright | `ai/prompts/generate-playwright-tests.md` |
| 5 | Code Review | `ai/prompts/code-review.md` |
| 6 | Human review + push | `ai/prompts/push-to-github.md` |

When a requirement changes after a module's test cases are approved, use the **change workflow** in the same guide instead: Requirement Change Validation → Impact Analysis → Test Case Update → Test Case Review → Automation Update → Regression → Code Review → Human Approval. It uses the prompt templates `validate-requirement-change.md`, `update-test-cases.md` and `update-playwright-tests.md`, plus the review and code-review templates.

All agents share one set of conventions. Module slugs are lowercase kebab-case (`shopping-cart`), TC_IDs look like `TC_SHOPPING_CART_001` and become permanent once the test cases are approved (obsolete cases are retired, never renumbered or deleted), and file paths are derived from the slug. See the guide for details.

## Authentication (optional)

To log in once and reuse the session across tests:

1. Create `tests/auth.setup.ts` that logs in and saves the session with `page.context().storageState({ path: 'playwright/.auth/user.json' })`.
2. Uncomment the `setup` project and the `storageState` and `dependencies` lines in `playwright.config.ts`.
3. If some tests need a logged-out browser (for example login tests), run them in a separate project without `storageState`.

Read credentials from environment variables (for example a local `.env` file). `playwright/.auth/` and `.env` files are git-ignored.

## CI

`.github/workflows/playwright.yml` runs on every push and pull request to `main` or `master`. It type-checks, lints, runs the tests, and uploads the HTML report and test results as artifacts.

Set a `BASE_URL` repository variable under **Settings → Secrets and variables → Actions → Variables**. If `BASE_URL` is missing, CI fails as soon as any spec other than the self-contained example exists.

## Contributing

Commit to a feature branch and open a pull request. Do not push directly to `main`.

## License

ISC
