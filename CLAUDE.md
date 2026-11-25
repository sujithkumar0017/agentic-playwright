# CLAUDE.md

QA Forge: a reusable, agent-driven QA framework template that is cloned for each new project. Keep everything generic (no app-specific names, URLs or credentials).
Current scope: UI automation with Playwright + TypeScript, driven by a 5-agent pipeline. Planned: API, mobile and load testing.

## Commands
- `npm run check`: type-check + lint (run before finishing any change)
- `npx playwright test`: run all tests (`BASE_URL` sets the application under test)
- `npx playwright test tests/<module-slug>.spec.ts`: run one module

## Pipeline
Follow `ai/orchestration/orchestration-guide.md`. The agent definitions in `ai/agents/` are the source of truth, and the subagents in `.claude/agents/` load them.
Initial order: requirement-validation → test-cases → test-case-review → playwright → code-review → human review → push (feature branch + PR).
Requirement change to an approved module: requirement change validation + impact analysis → test case update → test case review → automation update → regression → code review → human approval → push. Update only the impacted test cases and tests; never regenerate the module.

## Conventions
- Module slug: lowercase kebab-case, used in all file names (`tests/<module-slug>.spec.ts`, `docs/test-cases/<module-slug>-test-cases.md`, ...).
- TC_ID: `TC_<MODULE>_<NNN>`. IDs are provisional while the test cases document is Draft and permanent once it is Approved: never renumber, reuse or delete an approved ID; retire it instead. New IDs follow the Highest Allocated ID. Test titles start with their TC_ID. Full rules: `ai/agents/test-cases.agent.md`.
- Spec files import `test`/`expect` from `../fixtures`. Page Objects are registered as fixtures in `fixtures/index.ts`.
- User-facing locators, web-first assertions, no `waitForTimeout` (enforced by ESLint).
- Test data lives in `test-data/`. Secrets live in environment variables only, never in the repo.
- Never push to `main` directly. Use a feature branch and pull request (see `ai/prompts/push-to-github.md`).
