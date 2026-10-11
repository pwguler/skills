# Hillclimb

When: the user asks to push one metric as far as it goes, round after round.
Not when: something is slow and only has to get faster (perf-issue).

1. Write down the metric, the command that measures it, what must not change (the tests that must still pass, the output that must stay the same), and a stop condition: a number of rounds, a time limit, or a run of rounds with no gain.
2. Measure a baseline with that command, repeated enough times to show the spread, and commit the starting point.
3. Each round starts from the last kept commit: run `implement` on one small change and measure it; keep it when it beats the best so far under the `principle-explain-the-number` skill and nothing from step 1 broke, and otherwise revert that round's commit with `git revert`.
4. Log every round: the change, the number, and whether it was kept.
5. Run the rounds with the harness's loop runner, the stop condition from step 1 as its limit; without one, run them in this session up to that limit.
6. Run `verify` on the final claim about the number.

Done when: the stop condition from step 1 holds, and the log shows every kept change with its number.
