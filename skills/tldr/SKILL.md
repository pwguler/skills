---
name: tldr
description: Report a finished task as its result, not its transcript. Use when a task that produced an artifact or a run (a build, a workflow, a background agent, an implement or verify run, a release) has just finished and you are about to report it, and when the user types /tldr.
---

A task just finished. Give its result, not its transcript.

Write in ASD-STE100 Simplified Technical English: one meaning per word, active voice, short sentences, no idioms. The length adapts to the task: a small task gets two or three lines, a large or noisy one gets more, never longer than the result needs. Choose the shape that reads fastest for this result: prose for a few outcomes, bullets or a table when several distinct items need scanning.

- Lead with the result: what the task produced or decided.
- Give the outcomes that matter, keeping exact paths, commands, names, and error strings, and linking commits, PRs, and files. Redact secrets: a token, key, password, or connection string that appears in a command or error is replaced with a placeholder, never reproduced.
- Close with what needs the user now, or "nothing" when the task is done.

Add one small visual when the result is a new structure that prose would only list: a tree of files or calls, a flow between parts, a layout. One new or moved file is a path in prose, not a tree. Match the form to the structure: a shallow file tree or call tree, a flow diagram in Mermaid, or one HTML file for a layout, the last two only when the harness renders them; a text tree renders anywhere. Trees and diagrams carry names only, no bodies. An HTML file lives outside the repository and the reply gives its path. The visual follows the lead line and shows the touched region only, never the whole repository, and never file contents: the code diff is already on screen. Use the diff form when the surrounding tree already exists, a plain tree when it is new. What the visual shows, the prose does not repeat. One visual at most; a second one is transcript again.

A file split into a module:

```diff
 src/
 ├── commands/
-└── transport.ts
+└── transport/
+    ├── client.ts
+    └── stream.ts
```

Drop tool-call narration; keep outcomes. If the task produced nothing, say so; never invent progress.

Never explain what you were about to do, how you reasoned, or why the approach is sound unless asked. The user sees the diff and the output; do not restate them. This register applies to this reply only; it never becomes the standing register, and the reasoning it skips still lands in ADRs and specs on the land path. No preamble, no sign-off. The summary is the whole reply. Stop.
