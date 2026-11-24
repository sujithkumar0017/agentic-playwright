# Push to GitHub Prompt (after human review)

The code changes are complete and have been reviewed. Commit them to a feature branch and open a pull request.

### Context
- Module / Feature: {{moduleName}}
- Module slug: {{moduleSlug}}
- Summary of changes: {{changeSummary}}

### Steps to Perform
1. Run `git status` and `git diff` and show the human the list of changed files.
2. If the current branch is `main` or `master`, create a feature branch: `git checkout -b test/{{moduleSlug}}`.
3. Run `npm run check` and `npx playwright test`. Do not continue if they fail.
4. Stage **only the files you intend to commit, by name** (for example `git add tests/{{moduleSlug}}.spec.ts pages/LoginPage.ts`). Never use `git add .` or `git add -A`.
5. Run `git diff --cached` and check the staged changes for secrets: `.env` files, passwords, tokens, API keys, `playwright/.auth/` session files. If you find any, unstage them and tell the human.
6. Write a meaningful commit message based on the changes, and show it to the human.
7. **Ask the human for confirmation before committing and pushing.** Only continue if they explicitly answer Yes.
8. Commit, then push the feature branch: `git push -u origin <branch>`.
9. Open a pull request into `main` (for example with `gh pr create`), and share the PR link.

### Rules
- Never push directly to `main` or `master`.
- Never force push.
- Never commit secrets or sensitive files.
- Never merge the pull request yourself.
- Confirm the push succeeded, and report the branch name and PR link.
