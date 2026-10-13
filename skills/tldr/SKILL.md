---
name: tldr
description: Report a finished task as its result, not its transcript, or catch the user up since their last message in plain words. Use when a task that produced an artifact or a run (a build, a workflow, a background agent, an implement or verify run, a release) has just finished and you are about to report it; when the user types /tldr; and when they ask to resume, catch up, ketchup, or restate the last update in plain language.
---

A task just finished, or the user needs catching up. Give the result, or the catch-up, not the transcript.

Fast path: the default result report when the user did not ask to resume, catch up, or hear the last update in plain words.

1. Choose the mode. **Result** (default): report a finished task. **Resume / catch-up**: only when the user asks to resume, catch up, ketchup, or get the plain update since their last message. Follow [resume.md](references/resume.md).
2. For result mode, write in ASD-STE100 Simplified Technical English: one meaning per word, active voice, short sentences, no idioms. Lead with what the task produced or decided. Keep exact paths, commands, names, and error strings, and link commits, PRs, and files. Close with what needs the user now, or "nothing" when the task is done.
3. For resume / catch-up mode, stay read-only except for visuals built from evidence you already have. Open with the action-item count, then what happened, then each action item with options and a recommendation.
4. Add one small visual when the result or choice is a structure prose would only list, built to [visual.md](references/visual.md). One visual at most.

Rules:

- The length adapts to the task: a small task gets two or three lines, a large or noisy one gets more, never longer than the result needs.
- Choose the shape that reads fastest: prose for a few outcomes, bullets or a table when several distinct items need scanning.
- Redact secrets: a token, key, password, or connection string that appears in a command or error is replaced with a placeholder, never reproduced.
- Drop tool-call narration; keep outcomes. If the task produced nothing, say so; never invent progress.
- Never explain what you were about to do, how you reasoned, or why the approach is sound unless asked.
- The user sees the diff and the output; do not restate them in result mode.
- This register applies to this reply only; it never becomes the standing register, and the reasoning it skips still lands in ADRs and specs on the land path.
- No preamble, no sign-off. The summary is the whole reply. Stop.
