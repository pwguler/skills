// check-package.mjs: the npm package holds only package.json, README.md, LICENSE, skills/, and extensions/,
// with a SKILL.md for every skill folder and every declared extension. pi loads every skill and every declared
// extension from this checkout with no diagnostics, errors, or warnings. Needs @earendil-works/pi-coding-agent installed globally.
import { execSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const skillDirs = readdirSync(join(repo, 'skills'), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);
let failed = false;
const fail = (message) => {
  console.error(`::error::${message}`);
  failed = true;
};

const [pack] = JSON.parse(execSync('npm pack --dry-run --json', { cwd: repo, encoding: 'utf8' }));
const files = pack.files.map((file) => file.path);
const stray = files.filter((path) => !/^(package\.json|README\.md|LICENSE|skills\/.+|extensions\/[^/]+\.ts)$/.test(path));
if (stray.length) fail(`files outside skills/ and extensions/ in the package: ${stray.join(', ')}`);
const missing = skillDirs.filter((skill) => !files.includes(`skills/${skill}/SKILL.md`));
if (missing.length) fail(`SKILL.md missing from the package: ${missing.join(', ')}`);
console.log(`package ${pack.name}@${pack.version}: ${files.length} files, ${skillDirs.length - missing.length} of ${skillDirs.length} SKILL.md`);

// Find the global pi install first: npm reads its prefix from the real home folder.
const root = execSync('npm root -g', { encoding: 'utf8' }).trim();

// A throwaway home and agent folder, so that no skill installed on the machine joins the count.
const base = mkdtempSync(join(tmpdir(), 'pi-check-'));
const agentDir = join(base, 'agent');
const cwd = join(base, 'project');
mkdirSync(agentDir, { recursive: true });
mkdirSync(cwd, { recursive: true });
writeFileSync(join(agentDir, 'settings.json'), JSON.stringify({ packages: [repo] }));
process.env.HOME = base;
const { DefaultResourceLoader } = await import(join(root, '@earendil-works/pi-coding-agent/dist/index.js'));
const loader = new DefaultResourceLoader({ cwd, agentDir });
await loader.reload();
const { skills, diagnostics } = loader.getSkills();
for (const diagnostic of diagnostics) fail(`pi diagnostic: ${JSON.stringify(diagnostic).slice(0, 300)}`);
const loaded = skills.map((skill) => skill.name);
const notLoaded = skillDirs.filter((skill) => !loaded.includes(skill));
if (notLoaded.length) fail(`pi did not load: ${notLoaded.join(', ')}`);
console.log(`pi: ${loaded.length} skills, ${diagnostics.length} diagnostics`);

const declared = JSON.parse(readFileSync(join(repo, 'package.json'), 'utf8')).pi?.extensions ?? [];
const unpacked = declared.filter((path) => !files.includes(path.replace(/^\.\//, '')));
if (unpacked.length) fail(`declared extensions missing from the package: ${unpacked.join(', ')}`);
const { extensions, errors, warnings = [] } = loader.getExtensions();
for (const error of errors) fail(`pi extension error: ${error.path}: ${error.error}`);
for (const warning of warnings) fail(`pi extension warning: ${warning.path}: ${warning.warning}`);
const ours = extensions.filter((extension) => extension.resolvedPath.startsWith(join(repo, 'extensions') + sep));
if (ours.length !== declared.length) fail(`pi loaded ${ours.length} of the ${declared.length} extensions that package.json declares`);
console.log(`pi: ${ours.length} of ${declared.length} extensions, ${errors.length} errors, ${warnings.length} warnings`);
process.exit(failed ? 1 : 0);
