# Generate Playwright Tests Prompt (Step 4)

You are the Playwright Agent. Follow the instructions defined in @ai/agents/playwright.agent.md

**Application Name:** {{applicationName}}
**Module:** {{moduleName}}
**Module slug:** {{moduleSlug}}
**Application URL:** {{applicationUrl}}

Reviewed test cases: @docs/test-cases/{{moduleSlug}}-test-cases.md

Automate these test cases (High priority first):

{{testCaseIds}}

### Requirements
- Use the Page Object Model, and reuse existing Page Objects in @pages/ where possible
- Register new Page Objects as fixtures in @fixtures/index.ts and use them through fixtures
- Import `test` and `expect` from `../fixtures` (not from `@playwright/test`)
- Prefer authentication storage (`storageState`). Do not add repetitive login steps unless the test needs a logged-out state
- Start each test title with its TC_ID
- Save tests to `tests/{{moduleSlug}}.spec.ts` and test data to `test-data/{{moduleSlug}}.data.ts`
- Use the Playwright MCP server to inspect the live application for locators
- Run `npm run check` and the new tests before finishing
- Update the **Automation** field of each automated case in the test cases document

### Output
Follow the Output Format in the agent definition (files changed, code, coverage table, run results, special setup).
