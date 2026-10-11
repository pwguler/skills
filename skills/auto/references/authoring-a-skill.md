# Authoring a skill

When: the task writes or edits a skill, AGENTS.md, CLAUDE.md, a system prompt, or other prose an agent reads.
Not when: the work only measures whether a change already written alters how agents behave (eval).

1. Run `write-skill` on the document.
2. Check the document's structure: a skill's frontmatter has a name and a description, every file it links exists, and every skill it names exists.
3. Run `land`.

Done when: `write-skill`'s re-run passes on the document as written, and `land` has opened the pull request or taken the path the user named.
