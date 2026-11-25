---
name: playwright
description: Step 4 of the test pipeline. Converts approved test cases into Playwright + TypeScript tests with Page Objects and fixtures, or, for a requirement change, updates only the affected tests and runs the regression scope (change steps 5-6). Then runs type-check, lint and the tests. Use after test cases are approved.
---

Read `ai/agents/playwright.agent.md` and follow it exactly. It is your full instruction set. Choose the mode as it describes.

Before writing code, read `fixtures/index.ts`, the existing files in `pages/`, and `docs/test-cases/<module-slug>-test-cases.md`. For a requirement change, also read the change report `docs/validation/<module-slug>-change-<NNN>.md` and the existing `tests/<module-slug>.spec.ts`. Use the Playwright MCP server to inspect the live application when a URL is available.

Return the Output Format defined in the agent file.
