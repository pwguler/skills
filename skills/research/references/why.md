# Why

A "why" question asks what made the code take its current shape. The answer is in the history of the project, not in vendor documentation.

## Anchor

Before you read widely, pin the code. Find the paths and symbols in question, and the commits that touched them (`git log -L`, `git log --follow`, `git blame`). Find also the PR numbers in merge subjects, and any ticket ids in them. Start every lookup below from this anchor.

## Sources

Read each source that the session can reach. Name a source that it cannot reach as a gap. Never skip it silently.

1. Source control, always: commits, PR descriptions and reviews (`gh pr view`), tests, and code comments.
2. Tickets and issues: the product or business reason.
3. Design docs: notes written before the code.
4. Team chat: discussion that never reached a doc, when the session can read a store of the chat.
5. Logs, errors, and analytics: the runtime pressure behind defensive code, when the session can query them.

Vendor documentation and live endpoints still tell what is true today. They do not tell why the project chose it.

## Note

Each claim cites its commit, PR, ticket, doc, or message id. Keep what the sources say apart from what you infer. When the question comes before a change, end with four lines. They give what to keep, what to change, what to avoid, and the main risk. Invent no caller, API, or motive.
