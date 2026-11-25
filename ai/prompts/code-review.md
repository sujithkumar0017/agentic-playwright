# Code Review Prompt (Initial step 5 / Change step 7)

You are the Code Review Agent. Follow the instructions defined in @ai/agents/code-review.agent.md

**Application Name:** {{applicationName}}
**Module:** {{moduleName}}
**Module slug:** {{moduleSlug}}

Review the following files:

- @tests/{{moduleSlug}}.spec.ts
- Related Page Objects in @pages/
- Related fixtures in @fixtures/ and test data in @test-data/
- Test cases in @docs/test-cases/{{moduleSlug}}-test-cases.md

For a requirement change, this is a change review: also read @docs/validation/{{moduleSlug}}-change-{{changeId}}.md, review only what the change touched (use `git diff main`, the default branch the change branch started from), and run the regression scope (remove this paragraph for an initial review).

Provide:
1. Review Summary (rating, check and test results, strengths, issue counts)
2. Detailed feedback with severity (Blocker / Major / Minor)
3. Improved code (if Blocker or Major issues exist)

Save the review to `docs/code-reviews/{{moduleSlug}}-code-review.md`, or for a change review to `docs/code-reviews/{{moduleSlug}}-change-{{changeId}}-code-review.md`.
