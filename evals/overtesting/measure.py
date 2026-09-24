"""Measure verification cost and correctness for each run under an overtesting eval directory.

usage: measure.py <out-dir> <acceptance.test.ts>

A full gate is a command that checks the whole project (the suite, tsc, the build, the
linter). A targeted run names a test file or test. Per commit, the report counts the bash
calls that ran a full gate since the previous commit.
"""
import glob, json, os, re, shutil, statistics, subprocess, sys

EDIT_TOOLS = {"edit", "write"}
WRITES = re.compile(
    r"python3?\s+-\s*<<|cat\s+>|tee\s|sed\s+-i|perl\s+-\S*i|>\s*[\w./-]+\.(ts|js|json|md)\b"
    r"|\bgit\s+(checkout|switch|merge|rebase|pull|stash|reset|apply)\b|\bmv\s|\brm\s|--fix\b|--write\b")
SAVED = re.compile(r">\s*\S*/tmp/\S+\.log")
SEP = re.compile(r"&&|\|\||;|\||\n")
PREFIX = re.compile(r"^(\(\s*|cd\s+\S+\s*|timeout\s+\d+\s+|\w+=\S+\s+)+")

def kind(segment):
    s = PREFIX.sub("", segment.strip())
    if re.match(r"(npx\s+)?(vitest|jest)\b", s) or re.match(r"node\s+(--\S+\s+)*--test\b", s):
        return "targeted" if re.search(r"\S+\.(test|spec)\.\w+|--test-name-pattern", s) else "full"
    if re.match(r"(npm|pnpm|yarn|bun)\s+(run\s+)?(-s\s+)?(test|check|lint|typecheck|build)\b", s):
        return "targeted" if re.search(r"\s--\s+\S", s) else "full"
    if re.match(r"(npx\s+)?(tsc|eslint|biome)\b", s):
        return "full"
    return None

def tool_calls(session):
    calls, results = [], {}
    for line in open(session, errors="replace"):
        entry = json.loads(line)
        if entry.get("type") != "message":
            continue
        msg = entry["message"]
        if msg["role"] == "assistant":
            for part in msg.get("content") or []:
                if part.get("type") == "toolCall":
                    args = part.get("arguments") or {}
                    calls.append((part["id"], part["name"], args.get("command", ""), entry["timestamp"]))
        elif msg["role"] == "toolResult":
            results[msg["toolCallId"]] = entry["timestamp"]
    return calls, results

def seconds(a, b):
    from datetime import datetime
    f = lambda t: datetime.fromisoformat(t.replace("Z", "+00:00")).timestamp()
    return max(0.0, f(b) - f(a))

def measure(run_dir, acceptance):
    session = glob.glob(run_dir + ".sessions/*.jsonl")
    if not session:
        return dict(run=os.path.basename(run_dir), error="no session; see stdout.log",
                    gates_per_commit=[], repeats_on_unchanged_tree=0, gate_minutes=0.0,
                    suite_green=False, acceptance=False)
    calls, results = tool_calls(session[0])
    per_commit, current, repeats, full, targeted, saved, gate_secs = [], 0, 0, 0, 0, 0, 0.0
    last_full = None
    for cid, name, cmd, ts in calls:
        if name in EDIT_TOOLS:
            last_full = None
            continue
        if name != "bash":
            continue
        kinds = [k for k in (kind(s) for s in SEP.split(cmd)) if k]
        wrote = bool(WRITES.search(cmd))
        if "full" in kinds:
            full += 1; current += 1; saved += bool(SAVED.search(cmd))
            if cid in results:
                gate_secs += seconds(ts, results[cid])
            reused = "verify-" in cmd and re.search(r"\[\s*!?\s*-s\s", cmd)
            if last_full is not None and not wrote and not reused:
                repeats += 1
            last_full = None if wrote else cmd
        elif kinds:
            targeted += 1
        elif wrote:
            last_full = None
        if re.search(r"\bgit\s+commit\b", cmd):
            per_commit.append(current); current = 0
    git = lambda c: subprocess.run(c, shell=True, cwd=run_dir, capture_output=True, text=True).stdout.strip()
    probe = os.path.join(run_dir, "test", "zz-acceptance.test.ts")
    shutil.copy(acceptance, probe)
    accepted = git("node --test test/zz-acceptance.test.ts 2>&1 | grep -E '^ℹ fail ' ").endswith(" 0")
    os.remove(probe)
    return dict(
        run=os.path.basename(run_dir), commits=int(git("git rev-list --count main..HEAD") or 0),
        gates_per_commit=per_commit, full_gates=full, repeats_on_unchanged_tree=repeats,
        targeted_runs=targeted, gates_saving_output=saved, gate_minutes=round(gate_secs / 60, 1),
        suite_green=git("npm test >/dev/null 2>&1 && npm run -s typecheck >/dev/null 2>&1 && echo yes") == "yes",
        acceptance=accepted)

def main(out, acceptance):
    rows = [measure(d, acceptance) for d in sorted(glob.glob(os.path.join(out, "*-[0-9]*")))
            if not d.endswith(".sessions")]
    for r in rows:
        print(json.dumps(r))
    for arm in ("base", "candidate"):
        mine = [r for r in rows if r["run"].startswith(arm + "-")]
        gates = sorted(g for r in mine for g in r["gates_per_commit"])
        if not mine:
            continue
        if not gates:
            print(f"{arm:9} runs={len(mine)} no commits measured, all-correct=False")
            continue
        print(f"{arm:9} runs={len(mine)} commits={len(gates)} gates/commit median={statistics.median(gates)} "
              f"p90={gates[int(0.9 * len(gates))]} repeats={sum(r['repeats_on_unchanged_tree'] for r in mine)} "
              f"gate-min={sum(r['gate_minutes'] for r in mine):.1f} "
              f"all-correct={all(r['suite_green'] and r['acceptance'] for r in mine)}")

if __name__ == "__main__":
    main(*sys.argv[1:3])
