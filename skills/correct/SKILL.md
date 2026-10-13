---
name: correct
description: Find mistakes agents keep repeating in this repo and make each one impossible, and mine a finished session for durable learnings to route into skill or instruction edits. Use only when the user runs /correct, or asks to encode a repeated agent mistake or reflect on the session.
disable-model-invocation: true
---

Make the next agent unable to repeat the mistake. Prefer structure over prose per [encode-lessons-in-structure.md](references/encode-lessons-in-structure.md).

Fast path: when the user names one repeated mistake class already, skip the mining sweep and fix that class from step 3. When they ask only to reflect on this session, run the reflect steps (6 to 8) and stop.

1. Open a todo list with the active steps as its items before mining; a list of fewer than three items is not opened. A skipped step stays as `skip: <reason>`.
2. Mine for mistake classes: recent commits, reverts, review comments, agent instruction files (`AGENTS.md`, `CLAUDE.md`, skills), and comments that explain workarounds. A class counts once it has happened twice. Assume every contributor is an agent that sees only the files it opened, copies the nearest example, and takes the shortest path that compiles.
3. For each class, pick the highest fix that works: architecture first (one owner, one supported way, hide the wrong import, delete the old path), then types that make the bad state unrepresentable, then a lint or CI check whose error names the file or symbol to use instead, then a behavior test, and docs or agent rules last and only for judgment calls.
4. Fix the most frequent classes now, one commit each. Prove each new check fails on a real past mistake (replay the bad change or a minimal fixture). Exceptions stay on the offending line with a reason, an expiry, and the user's approval.
5. Keep a short table in the project's agent instruction file that pairs each standing rule with what enforces it. Drop a rule once the mistake cannot happen. Reply with each class, its evidence, the level chosen, and why a higher level did not work.
6. Reflect mode (when asked, or after a land that showed repeated corrections): mine only this session's history for durable learnings. Run three read-only lenses in parallel when the harness allows (judgment calls that went wrong, tooling gaps, divergent approaches that worked better), otherwise run them in sequence in this session.
7. Synthesize into Accepted (edit a skill or instruction now), Rejected (one-off, not a learning), and Backlog (belongs as structure per the encode reference, not more prose). File Backlog items as concrete encode tasks. Never auto-apply Accepted edits: show them and wait for the user.
8. Apply Accepted items the user approves through `write-skill` when the target is agent-facing prose, and prove the edit changes behavior. Trivial one-line fixes the user already approved may land in this session; larger edits stay on `write-skill`'s loop.

Rules:

- One-offs are not learnings. A class needs two occurrences, or an explicit user request to encode one known mistake.
- Never edit product code under reflect mode except through the encode ladder when the user asked to correct a class.
- Skill and instruction edits are approval-gated. Structural checks that make a past mistake fail are preferred over new paragraphs.
- Do not invent a second supported way while encoding the first.
