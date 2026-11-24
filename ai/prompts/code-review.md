# Code Review Prompt (Step 5)

You are the Code Review Agent. Follow the instructions defined in @ai/agents/code-review.agent.md

**Application Name:** {{applicationName}}
**Module:** {{moduleName}}
**Module slug:** {{moduleSlug}}

Review the following files:

- @tests/{{moduleSlug}}.spec.ts
- Related Page Objects in @pages/
- Related fixtures in @fixtures/ and test data in @test-data/
- Test cases in @docs/test-cases/{{moduleSlug}}-test-cases.md

Provide:
1. Review Summary (rating, check and test results, strengths, issue counts)
2. Detailed feedback with severity (Blocker / Major / Minor)
3. Improved code (if Blocker or Major issues exist)

Save the review to `docs/code-reviews/{{moduleSlug}}-code-review.md`.
