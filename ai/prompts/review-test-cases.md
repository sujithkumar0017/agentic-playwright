# Review Test Cases Prompt (Step 3)

You are the Review Agent. Follow the instructions defined in @ai/agents/review.agent.md

**Application Name:** {{applicationName}}
**Module:** {{moduleName}}
**Module slug:** {{moduleSlug}}

Review the test cases in @docs/test-cases/{{moduleSlug}}-test-cases.md

Provide:
1. A short Review Summary
2. Improved Test Cases (keep existing TC_IDs; new cases get the next unused number)

Ask for confirmation before saving.
