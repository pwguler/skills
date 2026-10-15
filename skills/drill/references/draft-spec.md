# The draft spec

## Writing the draft

The draft has these sections: `Destination`, `Decisions so far` (empty), `Open decisions`, `Not yet specified`, and `Out of scope`. Each open decision has a mode:

- **AFK**: the `research` skill can resolve it alone. Launch one subagent for each AFK decision, all in one `subagent` workflow call as one `runs.all` batch. Use a `researcher` for an outside fact, and a `scout` for the history of the code. Give each subagent its decision and the citation rule of the `research` skill. Each subagent writes its findings to `docs/research/<slug>-<decision-slug>.md`.
- **HITL**: only a live exchange with the user resolves it. Never answer your own HITL question.

One session writes the draft. It names the destination, lists the open decisions and the unclear items, and writes the draft. Then it launches the AFK subagents and stops. It resolves no decision itself.

## Working the draft

When a session opens a spec that still has an `## Open decisions` section:

1. Read the whole spec. Get the full view, not the detail of one decision.
2. Pick the next open decision. If the user named one, use that one. Claim it before you work on it.
3. Resolve it. For an AFK decision, read the findings at `docs/research/<slug>-<decision-slug>.md`. If no session made them yet, run the `research` skill now. Resolve a HITL decision with the user through the `core-interview` skill.
4. Write the resolution in `Decisions so far`, and remove the decision from `Open decisions`. Move each item in `Not yet specified` that is now exact into a new open decision. A decision that is beyond the destination goes out of scope. It is not resolved.
5. When the last open decision closes, clear `Not yet specified` as [spec-format.md](spec-format.md) says. This can add a new open decision. When both sections are empty, settle the spec in the same file, as spec-format.md says. Then `implement` can start.

Work on one decision in each session, except AFK decisions that subagents already work on. Sometimes no unclear item appears: the way is clear, and the work fits one session. Then there is no draft. Settle the spec in the usual way.
