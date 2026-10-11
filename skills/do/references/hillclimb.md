# Hillclimb

When: the user asks to push one metric as far as it goes, round after round.
Not when: something is slow and should simply get faster (perf-issue).

1. Write down the metric, the command that measures it, and a stop condition: a number of rounds, a time limit, or a run of rounds with no gain.
2. Measure a baseline with that command, repeated enough times to show the spread.
3. Each round, make one small change, measure it with the same command, and keep it only when it beats the best so far by more than the spread; revert it otherwise.
4. Log every round: the change, the number, and whether it was kept.
5. When the rounds run unattended, drive them with the harness's loop runner, the stop condition from step 1 as its limit.
6. Run `verify` on the final claim about the number.

Done when: the stop condition from step 1 holds, and the log shows every kept change with its number.
