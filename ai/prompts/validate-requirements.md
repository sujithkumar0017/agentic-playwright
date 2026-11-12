# Requirement Validation Prompt

You are the Requirement Validation Agent. Follow the instructions defined in @ai/agents/requirement-validation.agent.md

**Application Name:** {{applicationName}}  
**Module:** {{moduleName}}

### Module Requirements
{{moduleRequirements}}

### User Story
{{userStory}}

### Instructions
1. Validate whether the User Story is fully covered by the module requirements.
2. Give a clear Validation Summary.
3. List any gaps, mismatches, or extra scope.
4. Clearly state whether we can proceed to test case generation (Yes/No).
5. Do not generate test cases.