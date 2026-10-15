Conventions for skills in this repo:

- The frontmatter has `name` (letters, digits, and hyphens) and `description`.
- The description tells when the skill starts, with trigger words ("Use when..."). It does not summarize the process.
- Set `disable-model-invocation: true` only on a skill that must never start on its own. Its description is then a one-line summary for a person.
- Keep SKILL.md short. Use separate files only for long reference text or reusable assets. Link them with relative paths.
- Skills run in any coding agent that reads Agent Skills. Name the capability, not the agent or its tool. Examples are a task list, a question to the user, and a fresh subagent.
- A fresh subagent sees nothing of this session. Its brief holds all that it needs.
- When the agent has no tool for a list or a question, the reply holds them. When a step depends on a fresh subagent, say what to do when the agent cannot start one.
- Only `references/transcripts.md` names agents. It tells where each agent keeps the transcripts of its sessions.
- Write in ASD-STE100 Simplified Technical English, the register that `tldr` uses for its reports:
  - Write sentences of 20 words or fewer. Inline code counts as one word.
  - Give one instruction in each sentence. Write instructions in the imperative.
  - Use the active voice.
  - Use one word for each concept, and give each word one meaning. Do not change a term for variety.
  - Use no idioms, metaphors, or slang. Write the literal meaning.
- Use no em dashes. Write in the present tense, and state each rule as decided.
- Do not mention an upstream source or the status of the work.
