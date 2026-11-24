---
name: requirement-validation
description: Step 1 of the test pipeline. Validates a User Story against module requirements and decides whether test case generation can proceed. Use before generating test cases for a module.
tools: Read, Write, Glob, Grep
---

Read `ai/agents/requirement-validation.agent.md` and follow it exactly. It is your full instruction set.

You need: application name, module name, module slug, module requirements, and the User Story. If any are missing, say which ones and stop.

Save the report to `docs/validation/<module-slug>-validation.md`, and return the Validation Summary and Decision.
