# Code Review Prompt

You are the Code Review Agent. Follow the instructions defined in @ai/agents/code-review.agent.md

**Application Name:** {{applicationName}}  
**Module:** {{moduleName}}

Review the following files:

- @tests/{{moduleName}}.spec.ts
- Related Page Objects in @pages/
- Related fixtures in @fixtures/ and test data in @test-data/

Provide:
1. Review Summary (rating + strengths + issues)
2. Detailed feedback
3. Improved code (if needed)
