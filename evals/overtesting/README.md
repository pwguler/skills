# overtesting

Measures how much verification an agent runs while it implements a settled spec, and whether the work is still correct. Use it before shipping a change to `verify`, `implement`, `debug`, or `land`.

The task: implement `fixture/token-bucket.spec.md` (five acceptance criteria) in a small TypeScript package, slice by slice, one commit per slice. Each run is a headless `pi` session with only this repo's skills loaded.

## Run

```sh
evals/overtesting/run.sh [base-rev] [runs]
```

- `base-rev`: the revision whose `skills/` is the baseline. Default `HEAD`.
- The candidate is the working tree's `skills/`.
- `runs`: sessions per arm. Default 2. One baseline and one candidate session run at a time, side by side.
- `PI_ARGS`: extra flags for `pi`, such as `PI_ARGS="--model provider/id"`.

Requires `pi`, `node` 22 or newer, `npm`, `git`, and `python3`. Sessions and working copies stay in the temp directory the script prints.

## Measures

`measure.py` reads each session log and each working copy:

| field | meaning |
|---|---|
| `gates_per_commit` | bash calls that ran a full gate (the whole suite, `tsc`, a build, a linter) since the previous commit |
| `repeats_on_unchanged_tree` | full gates run again with no edit in between |
| `targeted_runs` | test runs that name a test file or test |
| `gates_saving_output` | full gates that wrote their output to a log file |
| `gate_minutes` | wall time spent in full gates |
| `suite_green` | `npm test` and `npm run typecheck` pass on the final tree |
| `acceptance` | `acceptance.test.ts`, which the agent never sees, passes against the final tree |

## Pass bar

The candidate passes when every run has `suite_green` and `acceptance`, and the pooled full gates per commit have a median of 1 or less and a p90 of 2 or less. A commit that only adds files an earlier gate already covered, or only edits Markdown, reuses the evidence record and counts 0.
