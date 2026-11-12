# Project Setup Prompt

Set up a new Agentic Playwright project with the following:

1. Initialize npm + Playwright (TypeScript)
2. Create folder structure:
   - pages/, tests/, test-data/, fixtures/, utils/
   - ai/agents/, ai/prompts/, ai/orchestration/
   - docs/test-cases/, .cursor/, .github/workflows/
3. Configure playwright.config.ts:
   - baseURL (read from the BASE_URL environment variable)
   - testIdAttribute only if the application uses a custom attribute (e.g. data-test, data-qa)
   - HTML and List reporters (add JSON or JUnit if your CI needs them)
   - Screenshot + video on failure
   - Trace on first retry
4. Create .cursor/mcp.json for Playwright MCP
5. Create the 4 agent definition files under ai/agents/
6. Create orchestration guide under ai/orchestration/
7. Create GitHub Actions workflow:
   - File: .github/workflows/playwright.yml
   - Run tests on push and pull request
   - Upload playwright-report and test-results as artifacts

Application URL: {{applicationUrl}}