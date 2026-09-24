#!/usr/bin/env bash
# Run the token-bucket task headless under two versions of the skills and measure both.
#
#   evals/overtesting/run.sh [base-rev] [runs]
#
# base-rev: the git revision whose skills/ is the baseline (default: HEAD).
# The candidate is the working tree's skills/. runs: sessions per arm (default: 2).
# PI_ARGS: extra flags for pi, such as "--model provider/id".
set -euo pipefail
here=$(cd "$(dirname "$0")" && pwd)
repo=$(git -C "$here" rev-parse --show-toplevel)
base=${1:-HEAD}; runs=${2:-2}
out=$(mktemp -d "${TMPDIR:-/tmp}/overtesting.XXXXXX")

mkdir -p "$out/skills-base" "$out/skills-candidate"
git -C "$repo" archive "$base" skills | tar -x -C "$out/skills-base"
cp -a "$repo/skills" "$out/skills-candidate/"

# The fixture: a small TypeScript package on a feature branch, with a settled spec.
fx="$out/fixture"
cp -a "$here/fixture" "$fx"
mkdir -p "$fx/docs/specs" && mv "$fx/token-bucket.spec.md" "$fx/docs/specs/token-bucket.md"
(cd "$fx" && npm ci --silent && git init -q -b main && git add -A \
  && git -c user.name=fixture -c user.email=fixture@localhost commit -qm "fixed window counter" \
  && git switch -qc token-bucket)

prompt="Implement the settled spec at docs/specs/token-bucket.md. You are already on its feature branch, token-bucket. Work it with the implement skill: slice by slice, commit each slice. When the work is done, verify it and stop. Nobody is available to answer questions: decide and proceed."

one() { # arm n
  local arm=$1 n=$2 dir="$out/$1-$2" skills=()
  cp -a "$fx" "$dir"; mkdir -p "$dir.sessions"
  git -C "$dir" config user.name agent; git -C "$dir" config user.email agent@localhost
  for d in "$out/skills-$arm"/skills/*/; do skills+=(--skill "${d%/}"); done
  # pi can fail to read its credentials when two sessions start at once; retry a start that made no session.
  for attempt in 1 2 3; do
    (cd "$dir" && timeout 3600 pi -p --session-dir "$dir.sessions" --tools read,bash,edit,write \
      --no-skills "${skills[@]}" ${PI_ARGS:-} "$prompt" > "$dir.sessions/stdout.log" 2>&1) || true
    compgen -G "$dir.sessions/*.jsonl" > /dev/null && return
    sleep 15
  done
}

for n in $(seq 1 "$runs"); do
  one base "$n" & sleep 20; one candidate "$n" & wait
done

python3 "$here/measure.py" "$out" "$here/acceptance.test.ts"
echo "sessions and working copies: $out"
