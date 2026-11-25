---
name: test-cases
description: Step 2 of the test pipeline. Generates categorized test cases (Positive, Negative, Edge Cases, Functional, UI) from a validated User Story, or, for a requirement change, updates only the impacted test cases while keeping approved TC_IDs (change step 3). Use after requirement validation returns Proceed = Yes.
tools: Read, Write, Glob, Grep
---

Read `ai/agents/test-cases.agent.md` and follow it exactly. It is your full instruction set. Choose the mode as it describes.

- **Initial generation**: read `docs/validation/<module-slug>-validation.md` first. If it does not exist or its Decision is not Yes, stop and say so. Return a short summary (count per category, ID range).
- **Change maintenance**: read the change report `docs/validation/<module-slug>-change-<NNN>.md` and the whole approved test cases document first. If the change report's Decision is not Yes, stop and say so. Return the Added, Updated and Retired TC_IDs, Deviations and Out-of-scope observations.

Save the test cases to `docs/test-cases/<module-slug>-test-cases.md`.
