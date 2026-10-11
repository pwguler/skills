# Session pickup

When: the user asks to resume work an earlier session started and left.
Not when: nothing was started before (route the task itself).

1. Read the state before touching anything: `git status`, the branch and its recent log, open worktrees, any pause note (`docs/specs/<slug>.pause.md` or `PAUSE.md`), and the spec under `docs/specs/`.
2. List what is done, what is in progress, and what was never verified, each with the evidence for it.
3. Run `verify` on whatever the last session claimed without a fresh record behind it.
4. Tell the user where the work stands and the next step, then continue through the route the work belongs to.

Done when: the list from step 2 is written down, every claim the last session left is verified or marked unverified, and the next step is running.
