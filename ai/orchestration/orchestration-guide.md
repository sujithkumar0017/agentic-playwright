# Orchestration Guide

## What is Orchestration?
Orchestration is the process of coordinating multiple AI agents so they work together in a defined sequence. The output of one agent becomes the input of the next.

QA Forge has two workflows, run by the same five agents:
- **Initial workflow**: builds a module's test cases and automation for the first time.
- **Change workflow**: when a client changes an approved requirement, updates only the affected test cases and automation instead of regenerating the module.

Each agent picks its mode from the module's files (mainly the test cases document's **Document Status**), as described in its definition in `ai/agents/`.

## Initial Workflow

```text
Module Requirements + User Story
            │
            ▼
 1. Requirement Validation Agent ──► docs/validation/<module-slug>-validation.md (Requirements Baseline v1)
            │
     Proceed = Yes? ── No ──► Refine the User Story or Requirements, then repeat step 1
            │ Yes
            ▼
 2. Test Cases Agent ──────────────► docs/test-cases/<module-slug>-test-cases.md (Draft)
            │
            ▼
 3. Review Agent ──────────────────► finalizes TC_IDs; saves the file as Approved (only after the human says Yes)
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

## Change Workflow

Use this when a requirement changes after the module's test cases are **Approved** (normally after its automation is merged). Start from an up-to-date `main` on a new feature branch, so the approved versions are the committed ones.

```text
Changed requirements (+ updated User Story, if any)
            │
            ▼
 1. Requirement Change Validation ─┐
            │                      ├─► Requirement Validation Agent
 2. Impact Analysis ───────────────┘   docs/validation/<module-slug>-change-<NNN>.md (Requirements Baseline v<N+1>)
            │
     Proceed = Yes? ── No ──► Clarify the change with the client, then repeat step 1
            │ Yes
            ▼
 3. Test Case Update ──────────────► Test Cases Agent: updates, retires and adds only the impacted cases
            │                        Document Status: Change Pending (CR-<NNN>)
            ▼
 4. Test Case Review ──────────────► Review Agent: verifies scope and ID stability;
            │                        saves the file as Approved (only after the human says Yes)
            ▼
 5. Automation Update ─────────────► Playwright Agent: updates only the affected tests, Page Objects, fixtures, test data
            │
            ▼
 6. Regression ────────────────────► Playwright Agent: the module's full spec + every spec in the regression scope
            │
            ▼
 7. Code Review ───────────────────► Code Review Agent: docs/code-reviews/<module-slug>-change-<NNN>-code-review.md
            │
            ▼
 8. Human Approval + run tests ────► Push to GitHub (feature branch + pull request)
```

Rules for the change workflow:
- Approved TC_IDs are never renumbered, reused or deleted. Obsolete cases are **retired** and stay in the document.
- New cases are numbered after the module's **Highest Allocated ID**.
- Test cases and tests outside the impact analysis are not modified. Agents report suggestions for them as **Out-of-scope observations**, to handle in a later change.
- Only one change per module can be in progress. A module whose Document Status is `Change Pending` must finish its change before the next one starts. To abandon a change, restore the approved files from `main` (for example `git checkout main -- docs/test-cases/<module-slug>-test-cases.md`).
- Other modules that share Page Objects, fixtures or test data are in the regression scope, but their test cases and tests are not changed.

## Test Case Document Lifecycle

The full rules are in `ai/agents/test-cases.agent.md`. In short:

| Document Status | Set by | TC_IDs | Can be automated |
|---|---|---|---|
| `Draft` | Test Cases Agent (initial generation) | Provisional: review may add, remove or reorder cases. Renumbered sequentially from `001` just before approval. | No |
| `Approved` | Review Agent, after the human says Yes | Permanent. **Highest Allocated ID** is recorded. | Yes |
| `Change Pending (CR-<NNN>)` | Test Cases Agent (change maintenance) | Approved IDs frozen. IDs added by the change are provisional until approval. | No |

Each test case also has a **Status**: `Active` or `Retired`.

## Conventions (used by every agent)

| Item | Convention | Example |
|---|---|---|
| Module Name | Display name | `Shopping Cart` |
| Module slug | Lowercase kebab-case, used in every file name | `shopping-cart` |
| TC_ID | `TC_<MODULE>_<NNN>`. Permanent once the document is Approved: never renumbered or reused | `TC_SHOPPING_CART_001` |
| Requirement ID | `REQ-<NN>`, numbered in the Requirements Baseline. Permanent: never renumbered or reused | `REQ-03` |
| Change ID | `CR-<NNN>`, numbered per module | `CR-001` |
| Validation report | `docs/validation/<module-slug>-validation.md` | `docs/validation/shopping-cart-validation.md` |
| Change report | `docs/validation/<module-slug>-change-<NNN>.md` | `docs/validation/shopping-cart-change-001.md` |
| Test cases | `docs/test-cases/<module-slug>-test-cases.md` | `docs/test-cases/shopping-cart-test-cases.md` |
| Spec file | `tests/<module-slug>.spec.ts` | `tests/shopping-cart.spec.ts` |
| Test data | `test-data/<module-slug>.data.ts` | `test-data/shopping-cart.data.ts` |
| Code review | `docs/code-reviews/<module-slug>-code-review.md` | `docs/code-reviews/shopping-cart-code-review.md` |
| Change code review | `docs/code-reviews/<module-slug>-change-<NNN>-code-review.md` | `docs/code-reviews/shopping-cart-change-001-code-review.md` |

Traceability: each requirement has a REQ number, each test case lists the REQ numbers it verifies, every test title starts with its TC_ID, and each test case's **Automation** field records the spec file that automates it. Each test case's **History** and the document's **Change Log** record which change created, updated or retired it.

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
| `{{changedRequirements}}` | The changed requirements: the complete new set, or a description of what changed |
| `{{changeReason}}` | Reason or source of the requirement change (optional) |
| `{{changeId}}` | The change number `<NNN>` assigned in change step 1 (e.g. `001`) |
| `{{changeSummary}}` | Summary of changes, for the push step |

## Step-by-Step Usage

Each step has one prompt template in `ai/prompts/`. Fill in the placeholders and send it to the AI assistant. The templates are the only copy of the prompts. Edit them there, not in this guide.

### Initial workflow

| Step | Agent | Prompt template | Output |
|---|---|---|---|
| 1 | Requirement Validation | [validate-requirements.md](../prompts/validate-requirements.md) | Validation report + Proceed Yes/No |
| 2 | Test Cases | [generate-test-cases.md](../prompts/generate-test-cases.md) | Draft test cases document |
| 3 | Review | [review-test-cases.md](../prompts/review-test-cases.md) | Review summary + improved test cases (saved as Approved after confirmation) |
| 4 | Playwright | [generate-playwright-tests.md](../prompts/generate-playwright-tests.md) | Spec, Page Objects, fixtures, test data |
| 5 | Code Review | [code-review.md](../prompts/code-review.md) | Code review report |
| 6 | Human | [push-to-github.md](../prompts/push-to-github.md) | Feature branch + pull request |

### Change workflow

| Step | Agent | Prompt template | Output |
|---|---|---|---|
| 1–2 | Requirement Validation | [validate-requirement-change.md](../prompts/validate-requirement-change.md) | Change report: requirement changes, impact analysis, Proceed Yes/No |
| 3 | Test Cases | [update-test-cases.md](../prompts/update-test-cases.md) | Impacted cases updated; document Change Pending |
| 4 | Review | [review-test-cases.md](../prompts/review-test-cases.md) | Change review + verification (saved as Approved after confirmation) |
| 5–6 | Playwright | [update-playwright-tests.md](../prompts/update-playwright-tests.md) | Updated tests + regression results |
| 7 | Code Review | [code-review.md](../prompts/code-review.md) | Change code review report |
| 8 | Human | [push-to-github.md](../prompts/push-to-github.md) | Feature branch + pull request |

Do not start a step until the previous step's output exists and, where required, the human has approved it.

### Using Claude Code
Each agent is also available as a Claude Code subagent in `.claude/agents/`:
`requirement-validation`, `test-cases`, `test-case-review`, `playwright`, `code-review`.
Ask Claude Code to "use the requirement-validation agent for module X", and give it the same inputs. For a change, say so and give the changed requirements (for example "use the requirement-validation agent to validate a requirement change for module X"). The subagents read their instructions from `ai/agents/`, so there is only one definition of each agent to maintain.

The `test-case-review` subagent is strictly read-only (no Bash). For a change review, the main session first runs `git diff main --name-only`, `git diff main -- docs/test-cases/<module-slug>-test-cases.md` and `git show main:docs/test-cases/<module-slug>-test-cases.md`, and passes the output to the subagent. After the human answers Yes, the main session saves the approved changes.

### Using Cursor
Paste the filled-in prompt template into Cursor chat. The `@ai/agents/...` references attach the agent definition.

## Quick Tips
- Work module by module.
- Automate high-priority test cases first.
- Always run `npm run check` and the generated tests, and fix failures.
- Keep test data in the `test-data/` folder, and secrets in environment variables.
- Follow the Page Object Model, and reuse existing Page Objects whenever possible.
- Use the Playwright MCP server when agents need to inspect the live application.
- For a requirement change, always start with change validation. Never edit approved test cases or tests by hand without a change report, or the traceability breaks.
