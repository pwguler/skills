// check-extension.mjs: the read-skill-first extension adds its rule only to a prompt that lists a skill
// the model may read, and puts the rule where pi renders it.
import assert from 'node:assert/strict';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const { default: readSkillFirst, RULE } = await import(join(repo, 'extensions', 'read-skill-first.ts'));

// Runs the handler once against a fake pi, and returns the prompt options after the handler.
function run({ skills, tools = ['read', 'bash', 'edit', 'write'], customPrompt }) {
  const handlers = {};
  readSkillFirst({ on: (name, handler) => { handlers[name] = handler; }, getActiveTools: () => tools });
  const options = { skills, customPrompt, promptGuidelines: [], sections: {}, selectedTools: tools };
  handlers.before_agent_start({ systemPromptOptions: options });
  return options;
}

const skill = { name: 'debug', description: 'Find the root cause.', disableModelInvocation: false };
const userOnly = { name: 'recall', description: 'Where work stands.', disableModelInvocation: true };
const cases = [
  ['a skill the model may read', () => assert.deepEqual(run({ skills: [skill] }).promptGuidelines, [RULE])],
  ['no skills', () => assert.deepEqual(run({ skills: [] }).promptGuidelines, [])],
  ['only skills that the user starts', () => assert.deepEqual(run({ skills: [userOnly] }).promptGuidelines, [])],
  ['no tool that can read a skill', () => assert.deepEqual(run({ skills: [skill], tools: ['edit', 'write'] }).promptGuidelines, [])],
  ['bash as the only reader', () => assert.deepEqual(run({ skills: [skill], tools: ['bash'] }).promptGuidelines, [RULE])],
  ['a custom system prompt', () => {
    const options = run({ skills: [skill], customPrompt: 'You are a reviewer.' });
    assert.equal(options.sections.read_skill_first, RULE);
    assert.deepEqual(options.promptGuidelines, []);
  }],
];
let failed = 0;
for (const [name, check] of cases) {
  try {
    check();
    console.log(`ok    ${name}`);
  } catch (error) {
    failed += 1;
    console.error(`::error::read-skill-first, ${name}: ${error.message.split('\n')[0]}`);
  }
}
process.exit(failed ? 1 : 0);
