# Review Test Cases Prompt (Initial step 3 / Change step 4)

You are the Review Agent. Follow the instructions defined in @ai/agents/review.agent.md

**Application Name:** {{applicationName}}
**Module:** {{moduleName}}
**Module slug:** {{moduleSlug}}

Review the test cases in @docs/test-cases/{{moduleSlug}}-test-cases.md

For a requirement change, also read the change report: @docs/validation/{{moduleSlug}}-change-{{changeId}}.md (remove this line for an initial review).

Choose the mode from the Document Status (`Draft` = initial review, `Change Pending` = change review).

Provide:
- **Initial review**: a short Review Summary, the ID Mapping table, and the complete Improved Test Cases with sequential, finalized TC_IDs.
- **Change review**: a short Change Review Summary, the Verification table (change scope, ID stability, coverage), the changed test cases only, and any Out-of-scope observations.

Ask for confirmation before saving.
