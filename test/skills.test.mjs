import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(
  process.env.SKILLS_ROOT ?? join(dirname(fileURLToPath(import.meta.url)), '..', 'skills'),
);

const skills = readdirSync(root, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

const kebabFile = /^[a-z0-9]+(-[a-z0-9]+)*\.[a-z0-9]+$/;

// Where each reference file must sit; a file named here lives in these skills and no other.
const referencePlacement = {
  'terms.md': ['drill', 'land', 'recall'],
  'decision-record.md': ['drill', 'land', 'recall'],
  'spec-format.md': ['drill'],
  'architecture-format.md': ['land'],
  'look.md': ['prototype'],
};

function referencesDir(skill) {
  return join(root, skill, 'references');
}

function referenceFiles(skill) {
  const dir = referencesDir(skill);
  if (!existsSync(dir) || !statSync(dir).isDirectory()) return [];
  return readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .sort();
}

function markdownFiles(skill) {
  const files = [join(root, skill, 'SKILL.md')];
  for (const name of referenceFiles(skill)) files.push(join(referencesDir(skill), name));
  return files;
}

// Link targets outside fenced code blocks.
function linkTargets(text) {
  const targets = [];
  let fence = null;
  for (const line of text.split('\n')) {
    const open = line.match(/^ {0,3}(`{3,}|~{3,})/);
    if (open) {
      if (fence === null) {
        fence = open[1];
        continue;
      }
      if (open[1][0] === fence[0] && open[1].length >= fence.length && line.trim() === open[1]) {
        fence = null;
        continue;
      }
    }
    if (fence !== null) continue;
    for (const match of line.matchAll(/\]\(\s*<?([^)\s>]*)>?(?:\s+[^)]*)?\)/g)) {
      targets.push(match[1]);
    }
  }
  return targets;
}

function isSkipped(target) {
  return target === '' || target.startsWith('#') || /^(https?|mailto):/i.test(target);
}

function resolveLink(file, target) {
  const path = decodeURI(target.split('#')[0]);
  return resolve(dirname(file), path);
}

function insideSkill(skill, path) {
  const rel = relative(join(root, skill), path);
  return rel !== '' && !rel.startsWith('..') && !isAbsolute(rel);
}

for (const skill of skills) {
  const skillDir = join(root, skill);

  test(`${skill}: AC-1 folder holds SKILL.md and at most a references/ folder of kebab-case files`, () => {
    const entries = readdirSync(skillDir, { withFileTypes: true });
    assert.ok(entries.some((e) => e.name === 'SKILL.md' && e.isFile()), 'SKILL.md is missing');
    const extra = entries
      .filter((e) => e.name !== 'SKILL.md' && !(e.name === 'references' && e.isDirectory()))
      .map((e) => e.name);
    assert.deepEqual(extra, [], `entries beside SKILL.md other than references/: ${extra.join(', ')}`);
    const refDir = referencesDir(skill);
    if (!existsSync(refDir)) return;
    const refEntries = readdirSync(refDir, { withFileTypes: true });
    const notFiles = refEntries.filter((e) => !e.isFile()).map((e) => e.name);
    assert.deepEqual(notFiles, [], `references/ holds non-files: ${notFiles.join(', ')}`);
    const badNames = refEntries.map((e) => e.name).filter((name) => !kebabFile.test(name));
    assert.deepEqual(badNames, [], `references/ names not in lowercase kebab-case: ${badNames.join(', ')}`);
  });

  test(`${skill}: AC-2 every relative link resolves to a file inside the skill folder`, () => {
    const broken = [];
    for (const file of markdownFiles(skill)) {
      for (const target of linkTargets(readFileSync(file, 'utf8'))) {
        if (isSkipped(target)) continue;
        const path = resolveLink(file, target);
        const where = relative(skillDir, file);
        if (!insideSkill(skill, path)) broken.push(`${where}: ${target} escapes the skill folder`);
        else if (!existsSync(path) || !statSync(path).isFile()) broken.push(`${where}: ${target} does not exist`);
      }
    }
    assert.deepEqual(broken, [], broken.join('\n'));
  });

  test(`${skill}: AC-2 every file in references/ is linked from SKILL.md`, () => {
    const skillFile = join(skillDir, 'SKILL.md');
    const linked = new Set(
      linkTargets(readFileSync(skillFile, 'utf8'))
        .filter((target) => !isSkipped(target))
        .map((target) => resolveLink(skillFile, target)),
    );
    const unlinked = referenceFiles(skill).filter((name) => !linked.has(join(referencesDir(skill), name)));
    assert.deepEqual(unlinked, [], `references/ files not linked from SKILL.md: ${unlinked.join(', ')}`);
  });

  test(`${skill}: AC-3 shared reference files are byte-identical copies in their placed folders`, () => {
    const problems = [];
    const own = referenceFiles(skill);
    for (const [name, owners] of Object.entries(referencePlacement)) {
      if (owners.includes(skill) && !own.includes(name)) problems.push(`references/${name} is missing`);
      if (!owners.includes(skill) && own.includes(name)) problems.push(`references/${name} belongs only in ${owners.join(', ')}`);
    }
    for (const name of own) {
      const bytes = readFileSync(join(referencesDir(skill), name));
      for (const other of skills) {
        if (other === skill) continue;
        const copy = join(referencesDir(other), name);
        if (existsSync(copy) && !bytes.equals(readFileSync(copy))) {
          problems.push(`references/${name} differs from the copy in ${other}`);
        }
      }
    }
    assert.deepEqual(problems, [], problems.join('\n'));
  });
}
