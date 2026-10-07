---
name: research
description: Find out what is true about a library, service, or standard by reading whoever owns the facts, and write the answer down with a citation per claim. Use when the user asks to look something up, to check how an API or tool really behaves, or to hand off reading while other work continues. Not for a bug in this codebase, which `debug` finds.
---

Read in this session. A subagent reads only when the user asks to hand the reading off, a draft spec fires its AFK decisions, or a payload is too large for the session (over about 2,000 lines, or images), as [guard the context window](references/guard-the-context-window.md) lays out. On a hand-off this session carries on and reads the note when it lands; a draft spec's notes wait for the session that works each decision. A harness that cannot run one reads inline, a bulk payload by search and section; say so, since the session waits on it.

Rules:
- What counts as evidence: the party that owns a fact. That means the vendor's own documentation, the source code, the specification, or a response from the live endpoint. A blog post, a forum answer, or a summary is at most a lead toward the owner, never the citation.
- What comes back: one Markdown note, each claim followed by where it came from. It goes to the path the caller asked for. No path given: follow wherever the repo keeps similar notes. No such convention: choose a location and name it in the reply.
