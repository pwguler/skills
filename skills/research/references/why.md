# Why

A why question asks what forced the code into its current shape. The answer lives in the project's own history, not in vendor documentation.

## Anchor

Before reading widely, pin the code: the paths and symbols in question, the commits that touched them (`git log -L`, `git log --follow`, `git blame`), the PR numbers in merge subjects, and any ticket ids those carry. Every lookup below starts from this anchor.

## Sources

Read each source the session can reach. A source it cannot reach is named as a gap, never skipped in silence.

1. Source control, always: commits, PR descriptions and reviews (`gh pr view`), tests, code comments.
2. Tickets and issues: the product or business reason.
3. Design docs: notes written before the code.
4. Team chat: discussion that never reached a doc, when a readable store exists.
5. Logs, errors, and analytics: the runtime pressure behind defensive code, when the session can query them.

Vendor documentation and live endpoints still answer what is true today; they do not answer why the project chose it.

## Note

Each claim cites its commit, PR, ticket, doc, or message id. Keep what the sources say apart from what you infer. When the question comes before a change, close with four lines: what to preserve, what to change, what to avoid, and the main risk. Invent no caller, API, or motive.
