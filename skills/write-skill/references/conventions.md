Conventions for skills in this repo:

- Frontmatter carries `name` (letters, digits, hyphens) and `description`. The description states when to fire, with trigger phrasing ("Use when..."), not a summary of the process.
- `disable-model-invocation: true` only for skills that must never fire on their own; the description then reads as a human-facing one-liner.
- Keep SKILL.md lean. Separate files only for heavy reference or reusable assets; link them relatively.
- Name the capability, not the tool. A harness binding (a subagent, the question tool, `/design`, `run`) is written as a preference, with what to do when it is absent. Degrade the mechanism, never the guarantee: where no substitute exists, the skill stops and says so rather than proceeding without it.
- No em dashes. Decisive present tense. Zero upstream or status mentions.
