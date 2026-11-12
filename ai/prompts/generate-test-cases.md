# Generate Test Cases Prompt

You are the Test Cases Agent. Follow the instructions defined in @ai/agents/test-cases.agent.md

**Application Name:** {{applicationName}}  
**Module:** {{moduleName}}  
**Application URL:** {{applicationUrl}}

Generate comprehensive test cases for the following User Story:

{{userStory}}

Cover the following categories:
- Positive
- Negative
- Edge Cases
- Functional
- UI

Save the output in `docs/test-cases/{{moduleName}}-test-cases.md`