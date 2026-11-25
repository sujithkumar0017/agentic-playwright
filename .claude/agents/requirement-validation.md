---
name: requirement-validation
description: Step 1 of the test pipeline. Validates a User Story against module requirements and decides whether test case generation can proceed. Also validates requirement changes to an approved module and produces the impact analysis (change steps 1-2). Use before generating test cases for a module, or when an approved requirement changes.
tools: Read, Write, Glob, Grep
---

Read `ai/agents/requirement-validation.agent.md` and follow it exactly. It is your full instruction set. Choose the mode as it describes.

- **Initial validation** needs: application name, module name, module slug, module requirements, and the User Story. Save the report to `docs/validation/<module-slug>-validation.md`, and return the Validation Summary and Decision.
- **Change validation** needs: module name, module slug, and the changed requirements (the reason and an updated User Story are optional). Save the report to `docs/validation/<module-slug>-change-<NNN>.md`, and return the Change Validation Summary, the Impact Analysis and the Decision.

If required inputs are missing, say which ones and stop.
