---
name: research
description: Find out what is true about a library, service, or standard by reading whoever owns the facts, or why code is shaped the way it is from its history, and write the answer down with a citation per claim. Use when the user asks to look something up, to check how an API or tool really behaves, to ask why a design exists, or to hand off reading while other work continues.
---

Research runs in this session. A subagent reads instead only when the user asks to hand the reading off, a draft spec fires its AFK decisions, or the payload is too large for the session (over about 2,000 lines, or images), as [guard the context window](references/guard-the-context-window.md) lays out: a `researcher` for an outside fact, a `scout` for the code's history. It returns the note, not the payload.

1. Sort the question. How a library, service, or standard behaves goes to its owner (step 2). Why our code is shaped as it is goes to its history (step 3).
2. Read the party that owns the fact: the vendor's own documentation, the source code, the specification, or a response from the live endpoint. A blog post, a forum answer, or a summary is at most a lead toward the owner, never the citation.
3. Read the history per [why.md](references/why.md): pin the code first, then read each source it lists, and name every source the session cannot reach.
4. Return one Markdown note, each claim followed by where it came from. It goes to the path the caller asked for. No path given: follow wherever the repo keeps similar notes. No such convention: choose a location and name it in the reply.

Rules:

- A citation points at the owner: for behavior, the vendor, source, spec, or live endpoint; for intent, the commit, PR, ticket, doc, or message that carries the decision.
- Never invent a citation. A search that finds nothing is an answer and goes in the note as a gap.
