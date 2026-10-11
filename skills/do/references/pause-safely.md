# Pause safely

When: work has to stop now, and another session should be able to resume it.
Not when: the work is done (`land`).

1. Leave no file half-edited: finish the edit in progress or undo it.
2. Commit the work in progress on its branch, marked as work in progress, never on the base branch and never with `--no-verify`.
3. Write a pause note, `docs/specs/<slug>.pause.md` beside the spec or `PAUSE.md` at the repository root when there is no spec, holding the state, the next step, what is unverified, and anything still running.
4. Stop anything still running that writes state, unless the note says why it is safe to leave running.
5. Delete nothing, and run no `reset --hard` or `git clean -fd`.

Done when: `git status` is clean or shows only what the note explains, and the note names the next step.
