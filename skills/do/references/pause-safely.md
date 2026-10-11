# Pause safely

When: work stops now, and another session resumes it later.
Not when: the work is done (`land`).

1. Leave no file half-edited: finish the edit in progress, or reverse that one edit by hand; never restore a whole file from git to undo it.
2. Stop anything still running that writes files, except a process writing to a database: that one goes into the note for the user to decide.
3. Write a pause note, `docs/specs/<slug>.pause.md` beside the spec or `PAUSE.md` at the repository root when there is no spec, holding the state, the next step, what is unverified, and anything still running.
4. Commit the work in progress and the note on the branch, marked as work in progress, never on the base branch and never with `--no-verify`.
5. Delete nothing, touch no database, and run no `reset --hard` or `git clean -fd`.

Done when: `git status` is clean or shows only what the note explains, and the committed note names the next step.
