# Generate Playwright Tests Prompt

You are the Playwright Agent. Follow the instructions defined in @ai/agents/playwright.agent.md

**Application Name:** {{applicationName}}  
**Module:** {{moduleName}}  
**Application URL:** {{applicationUrl}}

Convert the following high-priority test cases into Playwright + TypeScript code using Page Object Model:

{{testCases}}

### Requirements
- Use Page Object Model
- Reuse existing Page Objects where possible
- Import `test` and `expect` from `../fixtures` (not from `@playwright/test`)
- Prefer authentication storage (storageState). Do not add repetitive login steps unless the test specifically requires a logged-out state
- Use fixture-provided page objects when available
- Save tests in `tests/{{moduleName}}.spec.ts`
- Centralize test data in the `test-data/` folder if needed
- Keep tests focused on the scenario, not on setup

### Output
- List Page Objects that need to be created or updated
- Provide the complete test file code
- Mention if any special setup is required