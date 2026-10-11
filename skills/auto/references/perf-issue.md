# Perf issue

When: something is too slow or too costly, and the user wants it faster or cheaper.
Not when: the user asks to push one metric as far as it goes, round after round (hillclimb).

1. Write down the metric, the target (the user's, or one proposed and stated when the user gave none), the command that measures it, a round limit, and what must not change: the tests that must still pass and the output that must stay the same.
2. Measure a baseline on the current tree with that command, repeated enough times to show the spread, and keep the output.
3. Find where the cost goes by measuring it (a profile, a trace, timed sections), not by reading the code.
4. Run `implement` on one change, then measure it with the command from step 2; keep it only when the gain holds under the rules `verify` applies to a measured number and nothing from step 1 broke, revert it with `git revert` otherwise, and repeat until the target is met or the round limit is reached.
5. Run `verify` on the claim about the number.

Done when: the command from step 2, run on the current tree, shows the target met and `verify` accepts the number, or the round limit is reached and the report gives the best kept number against the target.
