# Orchestration Guide

## What is Orchestration?
Orchestration is the process of coordinating multiple AI agents so they work together in a defined sequence. The output of one agent becomes the input of the next.

## Agent Flow

Module Requirements + User Story  
↓  
1. Requirement Validation Agent  
↓  
Matched?  
├── Yes → 2. Test Cases Agent  
└── No  → Show mismatches (refine User Story or Requirements)  
↓  
3. Review Agent  
↓  
4. Playwright Agent  
↓  
5. Code Review Agent  
↓  
Human Final Review + Run Tests

## Dynamic Inputs

When using the agents, provide these inputs where applicable:

- **Application Name**: (e.g. Sauce Demo, MyApp)
- **Module / Feature Name**: (e.g. Login, Products, Cart, Checkout)
- **Application URL**: (if available)
- **User Story / Requirement**

## Step-by-Step Usage

### Step 1: Test Cases Agent
You are the Test Cases Agent. Follow the instructions defined in @ai/agents/test-cases.agent.md

Application Name: [Application Name]  
Module: [Module Name]  
Application URL: [URL]

Generate comprehensive test cases for the following User Story:

[Paste User Story here]

Cover Positive, Negative, Edge Cases, Functional, and UI scenarios.  
Save the output in docs/test-cases/[module-name]-test-cases.md

### Step 2: Review Agent
You are the Review Agent. Follow the instructions defined in @ai/agents/review.agent.md

Application Name: [Application Name]  
Module: [Module Name]

Review the test cases in @docs/test-cases/[module-name]-test-cases.md

Give a Review Summary and provide Improved Test Cases.

### Step 3: Playwright Agent
You are the Playwright Agent. Follow the instructions defined in @ai/agents/playwright.agent.md

Application Name: [Application Name]  
Module: [Module Name]  
Application URL: [URL]

Convert the following high-priority test cases into Playwright + TypeScript code using Page Object Model:

[List TC IDs or paste selected test cases]

Save the tests in tests/[module-name].spec.ts  
Create or update Page Objects as needed.

### Step 4: Code Review Agent
You are the Code Review Agent. Follow the instructions defined in @ai/agents/code-review.agent.md

Application Name: [Application Name]  
Module: [Module Name]

Review the following files:

- @tests/[module-name].spec.ts  
- Related Page Objects and test data files

Give a Review Summary and suggest improvements if needed.

## Quick Tips
- Work module by module.
- Automate high-priority test cases first.
- Always run the generated tests and fix failures.
- Keep test data in the `test-data/` folder.
- Follow Page Object Model.
- Use Playwright MCP when agents need to inspect the live application.
- Reuse existing Page Objects whenever possible.