---
name: core-interview
description: The interview loop that drill and other skills run, one fork at a time until every decision is settled. Use only when a skill names it, never on your own; a user who asks to be questioned on a plan, design, or decision goes to drill.
---

Keep questioning the user until the two of you agree on every part of the topic. Treat it as a decision tree and settle decisions in dependency order, each before the ones that hang off it. Relentless means no branch left open, not one round-trip per branch.

Rules:
- Ask only questions whose answer would change what gets built. When your recommendation is strong and reversing it later changes no acceptance criterion, non-goal, or public interface, and only then, don't ask: adopt it, record it as an assumption, move on.
- Real forks are put one at a time, waiting for each answer, the options carrying your candidate answers with the recommended one first. Use the harness question tool when it has one; without it, number the options in the reply, recommendation first, close with "or something else", and stop there.
- Every option list leaves the user free to type an answer the options missed.
- If a question can be answered by exploring the codebase, explore the codebase instead of asking. Facts are yours to find, never the user's. A lookup runs in a subagent and does not stall the interview: only the questions downstream of that fact wait for it. Without subagents, look it up inline before the question that depends on it.
- When the user can't put the target behavior into words, ask for a reference implementation: source code, even in another language or library, whose semantics to reimplement. Source beats prose or a screenshot.
- The closing summary lists every adopted assumption for a one-pass veto. A vetoed assumption reopens only that branch.

Deep mode (the `deep` skill is active): ask every branch one at a time, adopt no assumptions.
