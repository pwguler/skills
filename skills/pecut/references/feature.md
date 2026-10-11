# Feature

When: the task adds to what the product does or changes how it behaves.
Not when: every caller-visible behavior stays the same (refactoring), or the user wants a mock-up first (prototype).

1. Run `drill` when no settled spec at `docs/specs/<slug>.md` covers the change.
2. Run `implement` on the settled spec, or on the one-sentence plan from `drill`.
3. Run `land`.

Done when: each acceptance criterion of the spec, or the one-sentence plan's criterion, rests on fresh `verify` output for the current tree, and `land` has opened the pull request or taken the path the user named.
