Conventions for skills in this repo:

- The frontmatter has `name` (letters, digits, and hyphens) and `description`.
- The description tells when the skill starts, with trigger words ("Use when..."). It does not summarize the process.
- Set `disable-model-invocation: true` only on a skill that must never start on its own. Its description is then a one-line summary for a person.
- Keep SKILL.md short. Use separate files only for long reference text or reusable assets. Link them with relative paths.
- Skills run in pi. Name the pi mechanism directly: the `subagent`, `ask_user_question`, and `todo` tools, `/skill:<name>`, and `.pi/skills/` for project skills.
- Write no fallback for another agent. When a pi tool call fails, the skill stops and says so. It does not continue without the tool.
- Write in ASD-STE100 Simplified Technical English, the register that `tldr` uses for its reports:
  - Write sentences of 20 words or fewer. Inline code counts as one word.
  - Give one instruction in each sentence. Write instructions in the imperative.
  - Use the active voice.
  - Use one word for each concept, and give each word one meaning. Do not change a term for variety.
  - Use no idioms, metaphors, or slang. Write the literal meaning.
- Use no em dashes. Write in the present tense, and state each rule as decided.
- Do not mention an upstream source or the status of the work.
