# Update Playwright Tests Prompt (Change steps 5–6)

You are the Playwright Agent. Follow the **Change Maintenance Rules** defined in @ai/agents/playwright.agent.md

**Application Name:** {{applicationName}}
**Module:** {{moduleName}}
**Module slug:** {{moduleSlug}}
**Application URL:** {{applicationUrl}}

Change report: @docs/validation/{{moduleSlug}}-change-{{changeId}}.md
Approved test cases: @docs/test-cases/{{moduleSlug}}-test-cases.md
Existing automation: @tests/{{moduleSlug}}.spec.ts, related Page Objects in @pages/, fixtures in @fixtures/index.ts and test data in @test-data/

### Instructions
1. Check that the test cases document's Document Status is `Approved` and that the `CR-{{changeId}}` Change Log row has Review `Approved`. Otherwise stop and say so.
2. Read the impact analysis and the existing automation before changing anything.
3. Update the tests of the cases marked `Needs update (CR-{{changeId}})`, add tests for the new cases of `CR-{{changeId}}`, and delete the tests of the cases marked `Needs removal (CR-{{changeId}})`.
4. Change only the Page Objects, fixtures and test data those tests need. Do not modify unaffected tests. Report any automation edit the impact analysis did not list as a Deviation.
5. Keep the TC_ID in every test title. One test per TC_ID.
6. Run `npm run check`, then the regression: the full `tests/{{moduleSlug}}.spec.ts` plus every spec in the regression scope and every spec that uses shared code you changed.
7. Update only the **Automation** field of each case you worked on: `tests/{{moduleSlug}}.spec.ts` for updated and new cases, `Removed (CR-{{changeId}})` for retired cases whose test you deleted.

### Output
Follow the Output Format in the agent definition (files changed, code, coverage, regression results, deviations, out-of-scope observations, special setup).
