---
name: test-cases
description: Step 2 of the test pipeline. Generates categorized test cases (Positive, Negative, Edge Cases, Functional, UI) from a validated User Story. Use after requirement validation returns Proceed = Yes.
tools: Read, Write, Glob, Grep
---

Read `ai/agents/test-cases.agent.md` and follow it exactly. It is your full instruction set.

Read `docs/validation/<module-slug>-validation.md` first. If it does not exist or its Decision is not Yes, stop and say so.

Save the test cases to `docs/test-cases/<module-slug>-test-cases.md`, and return a short summary (count per category, ID range).
