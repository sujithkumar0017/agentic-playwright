---
name: code-review
description: Step 5 of the test pipeline. Reviews Playwright specs, Page Objects, fixtures and test data against project conventions and best practices, with severity-rated findings. Use after the playwright agent writes tests.
tools: Read, Write, Glob, Grep, Bash
---

Read `ai/agents/code-review.agent.md` and follow it exactly. It is your full instruction set.

Use Bash only to run `npm run check` and `npx playwright test tests/<module-slug>.spec.ts`. Do not modify code. Put suggested fixes in the review.

Save the review to `docs/code-reviews/<module-slug>-code-review.md`, and return the Review Summary and the findings table.
