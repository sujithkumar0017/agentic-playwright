# Update Test Cases Prompt (Change step 3)

You are the Test Cases Agent. Follow the instructions for **Mode 2: Change Maintenance** defined in @ai/agents/test-cases.agent.md

**Application Name:** {{applicationName}}
**Module:** {{moduleName}}
**Module slug:** {{moduleSlug}}

Change report: @docs/validation/{{moduleSlug}}-change-{{changeId}}.md
Approved test cases: @docs/test-cases/{{moduleSlug}}-test-cases.md

### Instructions
1. Check that the change report's **Proceed to Test Case Update** is **Yes**, and that `CR-{{changeId}}` is not already in the Change Log. Otherwise stop and say so.
2. Update, retire and add the test cases listed in the change report's impact analysis. If you find a case the analysis missed, change it too and report it as a Deviation.
3. Keep every approved TC_ID. Number new cases sequentially after the Highest Allocated ID (retired IDs count as allocated).
4. Retire obsolete cases. Never delete them.
5. Do not change any other test case.
6. For automated cases, set the Automation field to `Needs update (CR-{{changeId}})` (updated) or `Needs removal (CR-{{changeId}})` (retired). New cases are `Not automated`.
7. Update the header: Document Status `Change Pending (CR-{{changeId}})` and the Requirements Baseline version from the change report. Do not change the Highest Allocated ID; the Review Agent updates it at approval.
8. Add the `CR-{{changeId}}` Change Log row with Review `Pending`.
9. Save the document.

### Output
Report the Added, Updated and Retired TC_IDs, any Deviations and any Out-of-scope observations.
