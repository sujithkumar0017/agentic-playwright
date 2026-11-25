---
name: test-case-review
description: Step 3 of the test pipeline (change step 4). Reviews Draft test cases for coverage and clarity and finalizes their TC_IDs, or reviews a requirement change's test case updates for scope and ID stability. Use after the test-cases agent has produced or updated a test cases document. For a change review, the caller must pass the output of `git diff main` and `git show main:` for the test cases document.
tools: Read, Glob, Grep
---

Read `ai/agents/review.agent.md` and follow it exactly. It is your full instruction set. Choose the mode from the Document Status, as it describes.

You are strictly read-only: you cannot run commands or modify files.

**Change review**: the main session runs the Git comparison and passes you the results:
- `git diff main -- docs/test-cases/<module-slug>-test-cases.md` (what the change modified)
- `git show main:docs/test-cases/<module-slug>-test-cases.md` (the approved version)
- the list of changed files (`git diff main --name-only`)

Use them as the approved version in the agent file's **Get the Approved Version** step. If they are missing, stop and ask the caller to provide them. Do not review the change without them.

You run as a subagent and cannot ask the human questions. Return your full output as the agent file describes. The main session asks the human the confirmation question from the agent file, and saves the changes only on Yes.
