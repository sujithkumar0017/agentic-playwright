---
name: playwright
description: Step 4 of the test pipeline. Converts reviewed test cases into Playwright + TypeScript tests with Page Objects and fixtures, then runs type-check, lint and the tests. Use after test cases are reviewed.
---

Read `ai/agents/playwright.agent.md` and follow it exactly. It is your full instruction set.

Also read `fixtures/index.ts`, the existing files in `pages/`, and `docs/test-cases/<module-slug>-test-cases.md` before writing code. Use the Playwright MCP server to inspect the live application when a URL is available.

Return the Output Format defined in the agent file.
