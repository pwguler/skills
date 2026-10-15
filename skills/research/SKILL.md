---
name: research
description: Find out what is true about a library, service, or standard from the owner of the facts. Or find out from its history why code has its shape. Write the answer down with a citation for each claim. Read this skill when the user asks why code, a constant, or a setting has its current form. Use it when the user asks to look something up, or to check how an API or tool really behaves. Use it also to give reading to a subagent while other work continues.
---

Do research in this session. A subagent reads instead in three cases. The user asks to give the reading to a subagent. A draft spec launches its AFK decisions. Or the payload is too large for the session: over about 2,000 lines, or images. [Guard the context window](references/guard-the-context-window.md) tells how. The subagent returns the note, not the payload.

1. Sort the question. A question about how a library, service, or standard behaves goes to its owner, in step 2. A question about why our code has its shape goes to its history, in step 3.
2. Read the owner of the fact: the vendor documentation, the source code, the specification, or a live endpoint response. A blog post, a forum answer, or a summary only points you to the owner. It is never the citation.
3. Read the history as [why.md](references/why.md) says. First pin the code. Then read each source that why.md lists. Name every source that the session cannot reach.
4. Return one Markdown note, with the source after each claim. Write the note to the path that the caller asked for. When the caller gave no path, use the place where the repo keeps similar notes. When there is no such place, choose a location, and name it in the reply.

Rules:

- A citation points at the owner. For behavior, that is the vendor, the source, the spec, or the live endpoint. For intent, it is the commit, PR, ticket, doc, or message that holds the decision.
- Never invent a citation. A search that finds nothing is an answer. Write it in the note as a gap.
