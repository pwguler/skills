# Multi-phase plan

When: the user asks for a plan for work that runs in phases on one branch: a rewrite, a migration, or a change too large for one round of slices.
Not when: the phases ship as several dependent pull requests (figure-it-out).

1. Run `drill` on the work.
2. Run `implement` on the settled spec.
3. Run `land` once the last phase ends.

Done when: every phase of the spec has reached its criterion on the current tree, shown by fresh `verify` output, and `land` has opened the pull request or taken the path the user named.
