# Defect pass

Independent reviewers look for defects in a diff or in named files, before any taste judgment. They question how the change works, never what it is for. An empty list of findings is a valid result.

## Reviewers

First, write the diff to a file. Include `git diff <base>...HEAD` and any uncommitted changes. Include in full each untracked file that the change adds (`git ls-files --others --exclude-standard`), because `git diff` leaves those out. A reviewer can have no shell, so it cannot run `git` itself.

Launch two reviewers at the same time, each in a fresh subagent. Give each one the same brief: the diff file, the paragraph of intent, and the lenses below. No reviewer sees the findings of another.

A finding has a severity: `critical`, `warning`, or `nit`. It names a concrete path or call chain, and the failure that a user or caller would see. "I would have written it differently" is not a finding.

## Lenses

Give the reviewers the lenses that fit the change. Leave out the others.

- **Correctness:** edge cases, error paths, races, retries, and empty or very large inputs. Trace the path. A case that no caller can reach is not a finding.
- **Root cause:** a guard, retry, cast, or comment that hides a symptom instead of removing its cause.
- **Structure:** validation spread past the boundary, two paths for one job, lists kept the same by hand, and pass-through modules.
- **Verification:** tests that pass with the change reverted, and proof that rests on a proxy, not the artifact.
- **Complexity:** code that the change does not need yet, and dead or compatibility paths that it leaves.
- **Security:** untrusted input that reaches a dangerous sink, missing authorization, secrets in logs, and check-then-use races on a security path. Trace the input.
- **Comments:** a comment that repeats the code. Flag also a comment that guards a constraint that a type, lint rule, test, or runtime check could hold.

## Sorting

The lead session sorts every finding, with the context that the reviewers do not have:

- **Act on:** a concrete defect to fix before the claim ships. More than about five usually means that the sorting is too loose.
- **Consider:** a real trade-off for the user to weigh.
- **Noted:** true, but not actionable in this change.
- **Dismissed:** exaggerated nits, hypothetical cases that the call chain blocks, speculative abstractions, and preference rewrites. Dismiss also findings that ignore a known constraint. Give the reason for each one.

When two reviewers report the same defect, that is the strongest signal. A correctness or security finding from one reviewer alone still needs a stated reason before you dismiss it.
