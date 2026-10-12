Conventions for skills in this repo:

- Frontmatter carries `name` (letters, digits, hyphens) and `description`. A skill's description says what it does and who runs it, a pecut playbook or the skill that calls it; a principle's description starts with "Apply when" and states its rule. Neither summarizes the process.
- `disable-model-invocation: true` only for a skill the user starts, `pecut` and `recall`: it hides the skill from the model, so no playbook can call it, and its description reads as a human-facing one-liner.
- A skill never starts the next one: it runs its gates and the calls it resumes after, then stops. The order of skills lives in pecut's playbooks, and skills and principles name each other, never a path.
- Keep SKILL.md lean. Separate files only for heavy reference or reusable assets; link them relatively.
- Name the capability, not the tool. A harness binding (a subagent, the question tool, `/design`, `run`) is written as a preference, with what to do when it is absent. Degrade the mechanism, never the guarantee: where no substitute exists, the skill stops and says so rather than proceeding without it.
- No em dashes. Decisive present tense. Zero upstream or status mentions.
