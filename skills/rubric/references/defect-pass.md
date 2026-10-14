# Defect pass

Independent reviewers look for defects in a diff or in named files before any taste judgment. They challenge how the change works, never what it is for. An empty finding list is a valid result.

## Reviewers

Write the diff to a file first: `git diff <base>...HEAD` plus any uncommitted changes. A `reviewer` subagent runs no shell, and its diff tool does not read committed ranges.

Launch two `reviewer` subagents in parallel with `context: "fresh"`, each given the same brief: the diff file, the paragraph of intent, and the lenses below. Deep mode launches three. None sees another's findings.

A finding carries a severity (`critical`, `warning`, or `nit`), a concrete path or call chain, and the failure a user or caller would observe. "I would have written it differently" is not a finding.

## Lenses

Brief the lenses that fit the change and leave out the rest.

- **Correctness:** edge cases, error paths, races, retries, empty and oversized inputs. Trace the path; a case no caller can reach is not a finding.
- **Root cause:** a guard, retry, cast, or comment that hides a symptom instead of removing its cause.
- **Structure:** validation scattered past the boundary, two paths for one job, lists kept in sync by hand, modules that only pass calls through.
- **Verification:** tests that would still pass with the change reverted, and proof resting on a proxy instead of the artifact.
- **Complexity:** code the change does not need yet, and dead or compatibility paths it leaves behind.
- **Security:** untrusted input reaching a dangerous sink, missing authorization, secrets in logs, check-then-use races on a security path. Trace the input.
- **Comments:** a comment that restates the code, or one that guards a constraint a type, lint rule, test, or runtime check could hold instead.

## Sorting

The lead session sorts every finding, with the context the reviewers lack:

- **Act on:** a concrete defect to fix before the claim ships. More than about five usually means the sorting is too loose.
- **Consider:** a real trade-off for the user to weigh.
- **Noted:** true, and not actionable in this change.
- **Dismissed:** inflated nits, hypotheticals the call chain blocks, speculative abstractions, preference rewrites, findings that ignore a known constraint. Each one with its reason.

Two reviewers reporting the same defect is the strongest signal. A correctness or security finding from one reviewer alone still needs a stated reason before it is dismissed.
