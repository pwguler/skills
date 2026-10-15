import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

// pi shows each skill to the model by its name and description, and the model decides whether to read it.
// This rule makes the check part of every task, so that the model reads a matching skill first.
export const RULE =
  "Before you start a task, compare it with the descriptions in the skills list. " +
  "When a description matches, read that SKILL.md first, and follow it. " +
  "Do this also when the task is small or looks obvious.";

// pi lists the skills only when the active tools include a reader.
const READERS = ["read", "bash"];

export default function readSkillFirst(pi: ExtensionAPI) {
  pi.on("before_agent_start", (event) => {
    const options = event.systemPromptOptions;
    const offered = (options.skills ?? []).some((skill) => !skill.disableModelInvocation);
    const listed = READERS.some((tool) => pi.getActiveTools().includes(tool));
    if (!offered || !listed) return;
    // A custom system prompt replaces the rules section, so the rule needs a section of its own.
    if (options.customPrompt) options.sections = { ...options.sections, read_skill_first: RULE };
    else options.promptGuidelines = [...(options.promptGuidelines ?? []), RULE];
  });
}
