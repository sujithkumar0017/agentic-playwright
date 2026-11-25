# Requirement Change Validation Prompt (Change steps 1–2)

You are the Requirement Validation Agent. Follow the instructions for **Mode 2: Change Validation and Impact Analysis** defined in @ai/agents/requirement-validation.agent.md

**Application Name:** {{applicationName}}
**Module:** {{moduleName}}
**Module slug:** {{moduleSlug}}

Approved test cases: @docs/test-cases/{{moduleSlug}}-test-cases.md
Previous validation reports: @docs/validation/ (the `{{moduleSlug}}-validation.md` and `{{moduleSlug}}-change-*.md` files)

### Changed Requirements
{{changedRequirements}}

### Reason / Source of Change
{{changeReason}}

### Updated User Story (only if it changed)
{{userStory}}

### Instructions
1. Check that the test cases document's Document Status is `Approved`. If the document does not exist or is `Draft`, stop: use the initial validation prompt (`validate-requirements.md`) instead. If it is `Change Pending`, stop: another change is still in progress.
2. Find the current approved Requirements Baseline and assign the next change ID (`CR-<NNN>`).
3. Compare the changed requirements against the baseline, item by item.
4. Validate the change and give a Status: Matched / Partially Matched / Not Matched.
5. Produce the impact analysis: affected test cases (Update / Retire / No change), new test cases needed, affected automation, affected modules and the regression scope.
6. State whether we can proceed to the test case update (Yes/No), following the Decision Rules.
7. Do not edit test cases or code.
8. Save the report to `docs/validation/{{moduleSlug}}-change-<NNN>.md`.

### Output
Return the Change Validation Summary, the Impact Analysis and the Decision. State the assigned change ID clearly (for example `CR-001`). Its number (`001`) is the change ID to fill in for the next steps of the change workflow.
