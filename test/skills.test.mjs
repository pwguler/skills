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

// Each description as written at the base (750ade2), quotes included; its keys pin the skill list.
const descriptions = JSON.parse(
  readFileSync(join(dirname(fileURLToPath(import.meta.url)), 'descriptions.json'), 'utf8'),
);

// Skills under the deep dial, whose body ends with the deep line.
const deepDial = ['drill', 'core-interview', 'implement', 'debug', 'verify', 'rubric', 'land'];

const frontmatterKeys = ['name', 'description', 'argument-hint', 'disable-model-invocation'];
const deepPrefix = 'Deep mode (the `deep` skill is active):';
const lawForbidden = /^(- |\d+\. |Fast path:|Rules:|Deep mode|#)/;

// Frontmatter lines and body lines of a SKILL.md, or null when it has no frontmatter.
function splitSkillFile(text) {
  const lines = text.split('\n');
  if (lines[0] !== '---') return null;
  const end = lines.indexOf('---', 1);
  if (end === -1) return null;
  return { frontmatter: lines.slice(1, end), body: lines.slice(end + 1) };
}

function bodyBlocks(body) {
  const blocks = [];
  let current = [];
  for (const line of body) {
    if (line.trim() === '') {
      if (current.length) blocks.push(current);
      current = [];
    } else current.push(line);
  }
  if (current.length) blocks.push(current);
  return blocks;
}

// The first line that breaks the order law, fast path, steps, rules, deep line; null when none does.
function bodyOrderViolation(body) {
  const heading = body.find((line) => line.startsWith('#'));
  if (heading !== undefined) return heading;
  const blocks = bodyBlocks(body);
  if (blocks.length === 0) return '(empty body: the law is missing)';
  const law = blocks[0];
  const lawBreak = law.find((line) => lawForbidden.test(line));
  if (lawBreak !== undefined) return lawBreak;
  let stage = 1;
  for (let i = 1; i < blocks.length; i++) {
    const block = blocks[i];
    const first = block[0];
    if (first.startsWith('Fast path:')) {
      if (stage >= 2) return first;
      stage = 2;
    } else if (/^\d+\. /.test(first)) {
      if (stage >= 3) return first;
      const misnumbered = block.find((line, n) => !line.startsWith(`${n + 1}. `));
      if (misnumbered !== undefined) return misnumbered;
      stage = 3;
    } else if (first === 'Rules:') {
      if (stage >= 4) return first;
      let bullets = block.slice(1);
      if (bullets.length === 0) {
        bullets = blocks[i + 1] ?? [];
        i++;
      }
      if (bullets.length === 0) return first;
      const notBullet = bullets.find((line) => !line.startsWith('- '));
      if (notBullet !== undefined) return notBullet;
      stage = 4;
    } else if (first.startsWith(deepPrefix)) {
      if (block.length > 1) return block[1];
      if (i !== blocks.length - 1) return first;
      stage = 5;
    } else return first;
  }
  return null;
}

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

  test(`${skill}: AC-4 body runs law, fast path, steps, rules, deep line and nothing else`, () => {
    const parts = splitSkillFile(readFileSync(join(skillDir, 'SKILL.md'), 'utf8'));
    assert.ok(parts, 'SKILL.md has no frontmatter');
    const offending = bodyOrderViolation(parts.body);
    assert.equal(offending, null, `first line out of order: ${offending}`);
  });

  if (deepDial.includes(skill)) {
    test(`${skill}: AC-5 body ends with its deep line`, () => {
      const parts = splitSkillFile(readFileSync(join(skillDir, 'SKILL.md'), 'utf8'));
      assert.ok(parts, 'SKILL.md has no frontmatter');
      const last = bodyBlocks(parts.body).at(-1) ?? [];
      assert.ok(
        last.length === 1 && last[0].startsWith(deepPrefix),
        `body does not end with a line of its own starting "${deepPrefix}"; last line: ${last.at(-1)}`,
      );
    });
  }

  test(`${skill}: AC-6 frontmatter keys in order, name is the folder, description matches the base`, () => {
    assert.ok(Object.hasOwn(descriptions, skill), 'folder has no entry in test/descriptions.json');
    const parts = splitSkillFile(readFileSync(join(skillDir, 'SKILL.md'), 'utf8'));
    assert.ok(parts, 'SKILL.md has no frontmatter');
    const fields = parts.frontmatter.map((line) => {
      const match = line.match(/^([^:\s]+): (.*)$/);
      assert.ok(match, `frontmatter line is not "key: value": ${line}`);
      return { key: match[1], value: match[2] };
    });
    const keys = fields.map((f) => f.key);
    const unknown = keys.filter((key) => !frontmatterKeys.includes(key));
    assert.deepEqual(unknown, [], `keys not allowed: ${unknown.join(', ')}`);
    const expected = frontmatterKeys.filter((key) => keys.includes(key));
    assert.deepEqual(keys, expected, `keys out of order: ${keys.join(', ')}`);
    assert.ok(keys.includes('name') && keys.includes('description'), 'name or description is missing');
    const value = (key) => fields.find((f) => f.key === key).value;
    assert.equal(value('name'), skill, 'name differs from the folder name');
    assert.equal(value('description'), descriptions[skill], 'description differs from the base');
  });
}

for (const skill of Object.keys(descriptions).filter((name) => !skills.includes(name))) {
  test(`${skill}: AC-6 frontmatter keys in order, name is the folder, description matches the base`, () => {
    assert.fail(`test/descriptions.json lists ${skill} but skills/${skill}/ does not exist`);
  });
}
