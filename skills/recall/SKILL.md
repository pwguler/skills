---
name: recall
description: Rebuild where recent work stands from past pi sessions, the live repository, and the project's history, and hand back a short brief. Run /skill:recall before starting or resuming work, with a topic or without one.
disable-model-invocation: true
---

Before work starts or resumes, rebuild where it stands and hand back a short brief: what the work is, the state of each thread, the problems that keep coming back, and the next move. Read only what the topic needs, then stop.

Fast path: when the user's message already holds the state (paths, the branch, the change in flight), use it and skip the session search.

1. Lock the scope and say it back in one line: the window (the last 7 days unless the user names another), the topic when one is named, and the project (this working directory; another project's sessions are read only when the user asks). "All" stays all, never quietly cut to the latest few.
2. Find the sessions: the `.jsonl` files directly under `~/.pi/agent/sessions/--<path>--/`, where `<path>` is the working directory with its leading `/` dropped and each `/` turned into `-`. The `sessionDir` setting or `PI_CODING_AGENT_SESSION_DIR` moves that folder. Sort them by modification time (`ls -t`), and leave out the current session (`$PI_SESSION_FILE`) and the subdirectories, which hold subagent runs.
3. Search before reading: grep each session for the topic, then read only the stretches that match. Each line is one JSON entry: `message` entries hold the user's and the agent's turns, and `compaction` and `branch_summary` entries hold summaries pi already wrote. When the matching stretches run past about 2,000 lines, split the sessions across `scout` subagents, each returning one block per session: the topic, the user's goal, decisions, open threads, corrections the user had to make, and artifacts (branches, PRs, commits, tickets), each tagged with its session id.
4. When the topic names a feature, a file, an area, or a bug, also run the `research` skill's history path, asking what the current state is, what was tried and did not hold, and what users still report.
5. Check every branch, PR, commit, and ticket the search surfaced against live state with `git` and `gh`. What an agent did (the commands it ran, the errors it hit) is read from the session's own entries, never inferred.
6. Write the brief in four parts: **Where it stands**, at most five bullets; **Threads**, one line each, opening with exactly one tag (`[in flight <branch>]`, `[open PR #N]`, `[merged #N]`, `[reverted #N]`, `[done, uncommitted]`, or `[planned]`); **Problems**, at most five, the ones that recur, including complaints users still raise and any fix that landed and was later reverted; **Next move**, one concrete action.

Rules:

- Stay on the topic: a neighboring thread enters only when it blocks this one. When the brief outgrows a screen, cut detail before cutting threads.
- Cite every finding: a session by its id, the history by its source (commit, PR, ticket).
- Recall only reads: it changes no file, branch, or ticket.
- Redact secrets found in a session: a token, key, password, or connection string becomes a placeholder.
