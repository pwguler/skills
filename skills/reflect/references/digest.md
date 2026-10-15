# Digest

A transcript holds every tool output, so it is often too large to read. The digest keeps what a reviewer needs to find lessons.

When: step 2 of `reflect`.

The digest keeps the messages of the user and the replies of the agent. It also keeps each tool call, each tool error that the transcript marks, and each summary that the agent wrote. It cuts long text, and it leaves out tool output that succeeded. It replaces each token that looks like a secret with `<secret>`.

The script reads the transcript formats of the agents in [transcripts.md](transcripts.md). When it finds no user turn, the format is new to it. Then write the digest yourself, with the same parts.

Save this script outside the repository, for example as `/tmp/reflect-digest.mjs`. Then run it on the transcript of the current session:

```sh
node /tmp/reflect-digest.mjs <transcript> > /tmp/reflect-digest.md
```

```js
// reflect-digest.mjs <transcript.jsonl>: print a digest of an agent transcript as Markdown.
import { readFileSync } from 'node:fs';

const SECRET = /\b(?:npm_|ghp_|gho_|ghs_|github_pat_|sk-|xox[abprs]-|AKIA)[A-Za-z0-9_-]{12,}/g;
const redact = (text) => text.replace(SECRET, '<secret>');
const clip = (value, max) => {
  const text = redact(String(value ?? ''));
  return text.length > max ? `${text.slice(0, max)} [cut]` : text;
};
// Redact each string before JSON escapes a newline, because the escape hides the start of a token.
const argsOf = (args) => {
  let value = args;
  if (typeof args === 'string') {
    try {
      value = JSON.parse(args);
    } catch {
      return args;
    }
  }
  return JSON.stringify(value, (key, item) => (typeof item === 'string' ? redact(item) : item));
};
const TEXT = new Set(['text', 'input_text', 'output_text']);
const textOf = (content) => {
  if (typeof content === 'string') return content;
  if (!Array.isArray(content)) return '';
  return content.filter((part) => TEXT.has(part?.type)).map((part) => part.text).join('\n');
};

let turns = 0;
const toolNames = new Map();
const user = (text) => {
  if (text?.trim()) console.log(`\n## user, turn ${++turns}\n${clip(text, 4000)}`);
};
const agent = (text) => {
  if (text?.trim()) console.log(`\n## agent\n${clip(text, 2000)}`);
};
const summary = (text) => {
  if (text?.trim()) console.log(`\n## summary\n${clip(text, 4000)}`);
};
const call = (id, name, args) => {
  if (id) toolNames.set(id, name);
  console.log(`- call ${name}: ${clip(argsOf(args), 300)}`);
};
const error = (name, text) => console.log(`- error ${name ?? 'tool'}: ${clip(text, 600)}`);

for (const line of readFileSync(process.argv[2], 'utf8').split('\n')) {
  let entry;
  try {
    entry = JSON.parse(line);
  } catch {
    continue;
  }
  const { type } = entry;
  const message = entry.message ?? {};
  const payload = entry.payload ?? {};

  // Format 1: message entries with the roles user, assistant, and toolResult, and summary entries.
  if (type === 'compaction' || type === 'branch_summary') summary(entry.summary);
  if (type === 'message') {
    if (message.role === 'user') user(textOf(message.content));
    if (message.role === 'assistant') {
      agent(textOf(message.content));
      for (const part of message.content ?? []) if (part.type === 'toolCall') call(part.id, part.name, part.arguments);
    }
    if (message.role === 'toolResult' && message.isError) error(message.toolName, textOf(message.content));
  }

  // Format 2: user and assistant entries with content blocks of the types text, tool_use, and tool_result.
  if (type === 'summary') summary(entry.summary);
  if (type === 'user' || type === 'assistant') {
    if (entry.isCompactSummary) summary(textOf(message.content));
    else if (type === 'user') user(textOf(message.content));
    else if (type === 'assistant') agent(textOf(message.content));
    for (const part of Array.isArray(message.content) ? message.content : []) {
      if (part.type === 'tool_use') call(part.id, part.name, part.input);
      if (part.type === 'tool_result' && part.is_error) error(toolNames.get(part.tool_use_id), textOf(part.content));
    }
  }

  // Format 3: entries with a payload. The script reads no tool error from this format.
  if (type === 'event_msg' && payload.type === 'user_message') user(payload.message);
  if (type === 'event_msg' && payload.type === 'item_completed' && payload.item?.type === 'UserMessage') user(textOf(payload.item.content));
  if (type === 'response_item' && payload.type === 'message' && payload.role === 'assistant') agent(textOf(payload.content));
  if (type === 'response_item' && payload.type === 'function_call') call(payload.call_id, payload.name, payload.arguments);
  if (type === 'response_item' && payload.type === 'custom_tool_call') call(payload.call_id, payload.name, payload.input);
  if (type === 'compacted') summary(payload.message);
}
if (!turns) console.error('No user turn found: the format of this transcript is new to the script.');
```
