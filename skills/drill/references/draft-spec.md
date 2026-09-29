# The draft spec

## Writing the draft

The draft has these sections: `Destination`, `Decisions so far` (empty), `Open decisions`, `Not yet specified` (fog), `Out of scope`. Each open decision carries a Mode:

- **AFK**: the `research` skill can resolve it alone. Fire one research pass per AFK decision, in parallel when the harness dispatches subagents, each writing its findings to `docs/research/<slug>-<decision-slug>.md`. Without dispatch, the draft names the AFK decisions and their output paths, and later sessions work them one at a time.
- **HITL**: only a live exchange with the user resolves it. Never answer your own HITL question.

Writing the draft is one session's work: name the destination, sketch the frontier, write the draft, fire the AFK subagents, stop. It resolves nothing itself.

## Working the draft

When a session opens a spec that still has an `## Open decisions` section:

1. Load the whole spec: the low-res view, not one decision's deep dive.
2. Pick the next open decision; if the user named one, use that. Claim it before working it.
3. Resolve it: AFK decisions read the findings left at `docs/research/<slug>-<decision-slug>.md`, or run the `research` skill now when no session has produced them yet; HITL decisions are worked with the user through the `core-interview` skill.
4. Record the resolution in `Decisions so far`, and remove the decision from `Open decisions`. Graduate anything now sharp from `Not yet specified` into fresh open decisions. A decision revealed to sit beyond the destination is ruled out of scope instead of resolved.
5. When the last open decision closes, delete the `## Open decisions` section: the spec is settled and the loop takes over.

One decision per session, except AFK decisions already dispatched. If no fog surfaces at all (the way is clear and the journey fits one session), there is no draft; settle normally.
