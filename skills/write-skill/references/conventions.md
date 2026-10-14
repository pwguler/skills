Conventions for skills in this repo:

- Frontmatter carries `name` (letters, digits, hyphens) and `description`. The description states when to fire, with trigger phrasing ("Use when..."), not a summary of the process.
- `disable-model-invocation: true` only for skills that must never fire on their own; the description then reads as a human-facing one-liner.
- Keep SKILL.md lean. Separate files only for heavy reference or reusable assets; link them relatively.
- Skills run in pi. Name the pi mechanism directly: the `subagent`, `ask_user_question`, and `todo` tools, `/skill:<name>`, and `.pi/skills/` for project skills. Write no fallback for another agent. When a pi tool call fails, the skill stops and says so rather than proceeding without it.
- No em dashes. Decisive present tense. Zero upstream or status mentions.
