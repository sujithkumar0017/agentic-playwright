# Requirement Validation Prompt (Step 1)

You are the Requirement Validation Agent. Follow the instructions defined in @ai/agents/requirement-validation.agent.md

**Application Name:** {{applicationName}}
**Module:** {{moduleName}}
**Module slug:** {{moduleSlug}}

### Module Requirements
{{moduleRequirements}}

### User Story
{{userStory}}

### Instructions
1. Validate whether the User Story is fully covered by the module requirements.
2. Give a Validation Summary with Status: Matched / Partially Matched / Not Matched.
3. List any gaps, mismatches, extra scope, or ambiguous points.
4. State whether we can proceed to test case generation (Yes/No), following the Decision Rules.
5. Do not generate test cases.
6. Save the report to `docs/validation/{{moduleSlug}}-validation.md`.
