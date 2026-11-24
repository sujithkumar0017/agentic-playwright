# Orchestration Guide

## What is Orchestration?
Orchestration is the process of coordinating multiple AI agents so they work together in a defined sequence. The output of one agent becomes the input of the next.

## Agent Flow

```text
Module Requirements + User Story
            │
            ▼
 1. Requirement Validation Agent ──► docs/validation/<module-slug>-validation.md
            │
     Proceed = Yes? ── No ──► Refine the User Story or Requirements, then repeat step 1
            │ Yes
            ▼
 2. Test Cases Agent ──────────────► docs/test-cases/<module-slug>-test-cases.md
            │
            ▼
 3. Review Agent ──────────────────► updates the test cases file (only after the human says Yes)
            │
            ▼
 4. Playwright Agent ──────────────► tests/<module-slug>.spec.ts, pages/, fixtures/, test-data/
            │
            ▼
 5. Code Review Agent ─────────────► docs/code-reviews/<module-slug>-code-review.md
            │
            ▼
 Human final review + run tests ──► Push to GitHub (feature branch + pull request)
```

"Proceed = Yes" means a **Matched** status, or a **Partially Matched** status whose gaps the human explicitly accepted. See the Decision Rules in `ai/agents/requirement-validation.agent.md`.

## Conventions (used by every agent)

| Item | Convention | Example |
|---|---|---|
| Module Name | Display name | `Shopping Cart` |
| Module slug | Lowercase kebab-case, used in every file name | `shopping-cart` |
| TC_ID | `TC_<MODULE>_<NNN>`. IDs are permanent: never renumbered or reused | `TC_SHOPPING_CART_001` |
| Validation report | `docs/validation/<module-slug>-validation.md` | `docs/validation/shopping-cart-validation.md` |
| Test cases | `docs/test-cases/<module-slug>-test-cases.md` | `docs/test-cases/shopping-cart-test-cases.md` |
| Spec file | `tests/<module-slug>.spec.ts` | `tests/shopping-cart.spec.ts` |
| Test data | `test-data/<module-slug>.data.ts` | `test-data/shopping-cart.data.ts` |
| Code review | `docs/code-reviews/<module-slug>-code-review.md` | `docs/code-reviews/shopping-cart-code-review.md` |

Traceability: every test title starts with its TC_ID, and each test case's **Automation** field records the spec file that automates it.

## Inputs

| Placeholder | Meaning |
|---|---|
| `{{applicationName}}` | Application name (e.g. MyApp) |
| `{{moduleName}}` | Module / feature display name (e.g. Login, Shopping Cart) |
| `{{moduleSlug}}` | Module slug (e.g. login, shopping-cart) |
| `{{applicationUrl}}` | Application URL (if available) |
| `{{moduleRequirements}}` | The module's requirements |
| `{{userStory}}` | The User Story |
| `{{testCaseIds}}` | The TC_IDs to automate in step 4 |
| `{{changeSummary}}` | Summary of changes, for the push step |

## Step-by-Step Usage

Each step has one prompt template in `ai/prompts/`. Fill in the placeholders and send it to the AI assistant. The templates are the only copy of the prompts. Edit them there, not in this guide.

| Step | Agent | Prompt template | Output |
|---|---|---|---|
| 1 | Requirement Validation | [validate-requirements.md](../prompts/validate-requirements.md) | Validation report + Proceed Yes/No |
| 2 | Test Cases | [generate-test-cases.md](../prompts/generate-test-cases.md) | Test cases document |
| 3 | Review | [review-test-cases.md](../prompts/review-test-cases.md) | Review summary + improved test cases (saved after confirmation) |
| 4 | Playwright | [generate-playwright-tests.md](../prompts/generate-playwright-tests.md) | Spec, Page Objects, fixtures, test data |
| 5 | Code Review | [code-review.md](../prompts/code-review.md) | Code review report |
| 6 | Human | [push-to-github.md](../prompts/push-to-github.md) | Feature branch + pull request |

Do not start a step until the previous step's output exists and, where required, the human has approved it.

### Using Claude Code
Each agent is also available as a Claude Code subagent in `.claude/agents/`:
`requirement-validation`, `test-cases`, `test-case-review`, `playwright`, `code-review`.
Ask Claude Code to "use the requirement-validation agent for module X", and give it the same inputs. The subagents read their instructions from `ai/agents/`, so there is only one definition of each agent to maintain.

### Using Cursor
Paste the filled-in prompt template into Cursor chat. The `@ai/agents/...` references attach the agent definition.

## Quick Tips
- Work module by module.
- Automate high-priority test cases first.
- Always run `npm run check` and the generated tests, and fix failures.
- Keep test data in the `test-data/` folder, and secrets in environment variables.
- Follow the Page Object Model, and reuse existing Page Objects whenever possible.
- Use the Playwright MCP server when agents need to inspect the live application.
