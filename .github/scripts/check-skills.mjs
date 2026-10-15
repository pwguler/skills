// check-skills.mjs: install the suite as a user does, with npx skills into a throwaway home folder.
// Then pi must load every skill folder of this checkout from that install, with no diagnostics.
// Needs @earendil-works/pi-coding-agent installed globally.
import { execFileSync, execSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
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

// Find the global pi install first: npm reads its prefix from the real home folder.
const root = execSync('npm root -g', { encoding: 'utf8' }).trim();

// A throwaway home folder, so that no skill installed on the machine joins the count.
const home = mkdtempSync(join(tmpdir(), 'skills-check-'));
const cwd = join(home, 'project');
mkdirSync(cwd);
execFileSync('npx', ['-y', 'skills', 'add', repo, '-g', '-a', 'pi', '-s', '*', '-y'], {
  cwd,
  env: { ...process.env, HOME: home },
  stdio: 'ignore',
});
const installed = readdirSync(join(home, '.agents', 'skills'));
const notInstalled = skillDirs.filter((skill) => !installed.includes(skill));
if (notInstalled.length) fail(`npx skills did not install: ${notInstalled.join(', ')}`);
console.log(`npx skills: ${skillDirs.length - notInstalled.length} of ${skillDirs.length} skills installed`);

process.env.HOME = home;
const { DefaultResourceLoader } = await import(join(root, '@earendil-works/pi-coding-agent/dist/index.js'));
const loader = new DefaultResourceLoader({ cwd, agentDir: join(home, '.pi', 'agent') });
await loader.reload();
const { skills, diagnostics } = loader.getSkills();
for (const diagnostic of diagnostics) fail(`pi diagnostic: ${JSON.stringify(diagnostic).slice(0, 300)}`);
const loaded = skills.map((skill) => skill.name);
const notLoaded = skillDirs.filter((skill) => !loaded.includes(skill));
if (notLoaded.length) fail(`pi did not load: ${notLoaded.join(', ')}`);
console.log(`pi: ${loaded.length} skills, ${diagnostics.length} diagnostics`);
process.exit(failed ? 1 : 0);
