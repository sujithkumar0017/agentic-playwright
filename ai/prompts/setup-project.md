# Project Setup Prompt

Set up a new Agentic Playwright project with the following:

1. Initialize npm + Playwright (TypeScript). Requires Node.js 20+ (`"engines": { "node": ">=20" }`).
2. Add dev dependencies: `@playwright/test`, `@types/node`, `typescript`, `eslint`, `typescript-eslint`, `eslint-plugin-playwright`.
3. Add npm scripts: `test`, `typecheck` (`tsc --noEmit`), `lint` (`eslint .`), `check` (typecheck + lint).
4. Create `eslint.config.mjs` with `typescript-eslint` recommended rules and the `eslint-plugin-playwright` recommended rules for `tests/`. Make `no-wait-for-timeout`, `no-focused-test` and `prefer-web-first-assertions` errors.
5. Create the folder structure:
   - pages/, tests/, test-data/, fixtures/, utils/
   - ai/agents/, ai/prompts/, ai/orchestration/
   - docs/validation/, docs/test-cases/, docs/code-reviews/
   - .cursor/, .claude/agents/, .github/workflows/
6. Configure `playwright.config.ts`:
   - baseURL (read from the BASE_URL environment variable)
   - testIdAttribute only if the application uses a custom attribute (e.g. data-test, data-qa)
   - HTML and List reporters (add JSON or JUnit if your CI needs them)
   - Screenshot + video on failure
   - Trace on first retry
   - An optional, commented-out auth `setup` project using `storageState`
7. Create `fixtures/index.ts` that extends `test` with Page Object fixtures and re-exports `expect`.
8. Create the Playwright MCP config with a **pinned** `@playwright/mcp` version (not `@latest`) in both `.cursor/mcp.json` (Cursor) and `.mcp.json` (Claude Code).
9. Create the 5 agent definition files under `ai/agents/`:
   - requirement-validation, test-cases, review, playwright, code-review
10. Create matching Claude Code subagents under `.claude/agents/` that point to the files in `ai/agents/`.
11. Create the orchestration guide under `ai/orchestration/`.
12. Create `.gitignore` covering `node_modules/`, Playwright output folders, `playwright/.auth/` and `.env` files.
13. Create the GitHub Actions workflow:
    - File: `.github/workflows/playwright.yml`
    - Run on push and pull request
    - Run `npm run typecheck` and `npm run lint` before the tests
    - Fail if `BASE_URL` is not set and application tests exist
    - Upload `playwright-report` and `test-results` as artifacts

Application URL: {{applicationUrl}}
