# Digest

A pi session file holds every tool output, so it is often too large to read. The digest keeps what a reviewer needs to find lessons.

When: step 2 of `reflect`.

The digest keeps the messages of the user and the replies of the agent. It also keeps each tool call, each tool error, and each summary from pi. It cuts long text, and it leaves out tool output that succeeded. It replaces each token that looks like a secret with `<secret>`.

Save this script outside the repository, for example as `/tmp/reflect-digest.mjs`. Then run it:

```sh
node /tmp/reflect-digest.mjs "$PI_SESSION_FILE" > /tmp/reflect-digest.md
```

```js
// reflect-digest.mjs <session.jsonl>: print a digest of a pi session as Markdown.
import { readFileSync } from 'node:fs';

const SECRET = /\b(?:npm_|ghp_|gho_|ghs_|github_pat_|sk-|xox[abprs]-|AKIA)[A-Za-z0-9_-]{12,}/g;
const redact = (text) => text.replace(SECRET, '<secret>');
const clip = (value, max) => {
  const text = redact(String(value ?? ''));
  return text.length > max ? `${text.slice(0, max)} [cut]` : text;
};
// Redact each string before JSON escapes a newline, because the escape hides the start of a token.
const argsOf = (args) => JSON.stringify(args, (key, value) => (typeof value === 'string' ? redact(value) : value));
const textOf = (content) =>
  typeof content === 'string' ? content : (content ?? []).filter((part) => part.type === 'text').map((part) => part.text).join('\n');

let turn = 0;
for (const line of readFileSync(process.argv[2], 'utf8').split('\n')) {
  let entry;
  try {
    entry = JSON.parse(line);
  } catch {
    continue;
  }
  if (entry.type === 'compaction' || entry.type === 'branch_summary') console.log(`\n## summary\n${clip(entry.summary, 4000)}`);
  const message = entry.type === 'message' ? entry.message : undefined;
  if (message?.role === 'user') console.log(`\n## user, turn ${++turn}\n${clip(textOf(message.content), 4000)}`);
  if (message?.role === 'assistant') {
    const reply = textOf(message.content);
    if (reply.trim()) console.log(`\n## agent\n${clip(reply, 2000)}`);
    for (const part of message.content ?? []) {
      if (part.type === 'toolCall') console.log(`- call ${part.name}: ${clip(argsOf(part.arguments), 300)}`);
    }
  }
  if (message?.role === 'toolResult' && message.isError) console.log(`- error ${message.toolName}: ${clip(textOf(message.content), 600)}`);
}
```
