# Feature

When: the task, in one change or a plan in phases, adds to what the product does, changes how it behaves, or is a named edit to docs or config.
Not when: the code's structure changes and every caller-visible behavior stays the same (refactoring), the phases ship as several dependent pull requests (figure-it-out), or the user wants a mock-up first (prototype).

1. Run `drill` when no settled spec at `docs/specs/<slug>.md` covers the change.
2. Run `implement` on the settled spec, or on the one-sentence plan from `drill`.
3. Run `land` when the change sits in a repository.

Done when: inside a repository, each acceptance criterion of the spec, or the one-sentence plan's criterion, rests on fresh `verify` output for the current tree, and `land` has opened the pull request or taken the path the user named; outside one, each criterion rests on its result read back.
