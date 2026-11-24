# Generate Test Cases Prompt (Step 2)

You are the Test Cases Agent. Follow the instructions defined in @ai/agents/test-cases.agent.md

**Application Name:** {{applicationName}}
**Module:** {{moduleName}}
**Module slug:** {{moduleSlug}}
**Application URL:** {{applicationUrl}}

Validation report: @docs/validation/{{moduleSlug}}-validation.md

Generate comprehensive test cases for the following User Story:

{{userStory}}

Cover the following categories:
- Positive
- Negative
- Edge Cases
- Functional
- UI

Use TC_IDs in the format `TC_<MODULE>_<NNN>`.
Save the output to `docs/test-cases/{{moduleSlug}}-test-cases.md`.
