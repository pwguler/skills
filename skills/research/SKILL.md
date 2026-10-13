---
name: research
description: Find out what is true about a library, service, or standard by reading whoever owns the facts, or why code is shaped the way it is from internal history, and write the answer down with a citation per claim. Use when the user asks to look something up, to check how an API or tool really behaves, to ask why a design exists, or to hand off reading while other work continues.
---

Reading is slow, so it runs beside the main work: a subagent reads while this session carries on. A harness that cannot run one alongside reads inline; say so, since the session waits on it.

Fast path: when the question is only "what does this API do today," read the vendor or source owner and skip internal history. When the question is why the code is shaped this way, run the why path.

1. Sort the question. External fact (how a library, service, or standard behaves) stays on the owner path below. Motivation or intent behind our code follows [why.md](references/why.md).
2. For an external fact, read the party that owns it: the vendor's own documentation, the source code, the specification, or a response from the live endpoint. A blog post, a forum answer, or a summary is at most a lead toward the owner, never the citation.
3. For a why question, build the code anchor first, then cover every reachable internal source class in [why.md](references/why.md), naming gaps when a class is unavailable.
4. Return one Markdown note, each claim followed by where it came from. It goes to the path the caller asked for. No path given: follow wherever the repo keeps similar notes. No such convention: choose a location and name it in the reply.

Rules:

- What counts as evidence: the party that owns a fact. For external behavior that is the vendor, source, spec, or live endpoint. For intent that is commits, PRs, tickets, docs, chat, or observability that actually carry the decision.
- Never invent a citation. A search that finds nothing is an answer and goes in the note as a gap.
- Prefer concurrent read-only subagents per source class when the harness allows and the why path needs more than one class.
