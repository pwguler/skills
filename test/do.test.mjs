// Checks the do router and the links of the whole suite. SKILLS_ROOT points the check at another copy of skills/.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(process.env.SKILLS_ROOT ?? join(dirname(fileURLToPath(import.meta.url)), '..', 'skills'));
const doDir = join(root, 'do');
const read = (path) => readFileSync(path, 'utf8');
const skillNames = readdirSync(root).filter((name) => existsSync(join(root, name, 'SKILL.md')));
const playbookFiles = existsSync(join(doDir, 'references')) ? readdirSync(join(doDir, 'references')).filter((n) => n.endsWith('.md')) : [];

function markdownFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? markdownFiles(path) : name.endsWith('.md') ? [path] : [];
  });
}

// Link targets outside fenced code blocks.
function links(text) {
  const targets = [];
  let fence = null;
  for (const line of text.split('\n')) {
    const marker = line.match(/^\s*(`{3,}|~{3,})/);
    if (marker) {
      if (fence === null) fence = marker[1][0];
      else if (marker[1][0] === fence) fence = null;
      continue;
    }
    if (fence !== null) continue;
    for (const m of line.matchAll(/\]\(\s*<?([^)\s>]*)>?(?:\s+[^)]*)?\)/g)) targets.push(m[1]);
  }
  return targets.filter((t) => t !== '' && !t.startsWith('#') && !/^(https?|mailto):/i.test(t));
}

// Backticked single lowercase words: in this router's files, each one names a skill.
const namedSkills = (text) => [...text.matchAll(/`([a-z][a-z0-9-]*)`/g)].map((m) => m[1]);

test('do: runs only when the user invokes it', () => {
  const front = read(join(doDir, 'SKILL.md')).split('\n---')[0];
  assert.match(front, /^disable-model-invocation: true$/m, 'do/SKILL.md lacks disable-model-invocation: true');
});

test('do: the routes in SKILL.md and the playbooks in references/ match, both ways', () => {
  const routed = links(read(join(doDir, 'SKILL.md'))).filter((t) => t.startsWith('references/')).map((t) => t.slice('references/'.length));
  const missingFile = routed.filter((name) => !playbookFiles.includes(name));
  const unrouted = playbookFiles.filter((name) => !routed.includes(name));
  assert.deepEqual({ missingFile, unrouted }, { missingFile: [], unrouted: [] });
});

test('do: every skill the router or a playbook names exists in this repository', () => {
  const files = [join(doDir, 'SKILL.md'), ...playbookFiles.map((n) => join(doDir, 'references', n))];
  const unknown = files.flatMap((f) => namedSkills(read(f)).filter((s) => !skillNames.includes(s)).map((s) => `${relative(root, f)}: ${s}`));
  assert.deepEqual(unknown, []);
});

test('do: each playbook has When:, numbered steps, and Done when:, in 10 to 30 lines', () => {
  const bad = playbookFiles.flatMap((name) => {
    const text = read(join(doDir, 'references', name)).trimEnd();
    const lines = text.split('\n');
    const problems = [];
    if (!lines.some((l) => l.startsWith('When: '))) problems.push('no When:');
    if (!lines.some((l) => /^\d+\. /.test(l))) problems.push('no numbered step');
    if (!lines.some((l) => l.startsWith('Done when: '))) problems.push('no Done when:');
    if (lines.length < 10 || lines.length > 30) problems.push(`${lines.length} lines`);
    return problems.map((p) => `${name}: ${p}`);
  });
  assert.deepEqual(bad, []);
});

test('suite: every relative link resolves to a file inside its own skill folder', () => {
  const broken = skillNames.flatMap((skill) => markdownFiles(join(root, skill)).flatMap((file) =>
    links(read(file)).flatMap((target) => {
      const path = resolve(dirname(file), decodeURI(target.split('#')[0]));
      const rel = relative(join(root, skill), path);
      if (rel.startsWith('..') || isAbsolute(rel)) return [`${relative(root, file)}: ${target} leaves ${skill}/`];
      return existsSync(path) ? [] : [`${relative(root, file)}: ${target} does not exist`];
    })));
  assert.deepEqual(broken, []);
});


test('verify: opens references/explain-the-number.md', () => {
  assert.ok(links(read(join(root, 'verify', 'SKILL.md'))).includes('references/explain-the-number.md'), 'verify/SKILL.md does not link references/explain-the-number.md');
});
