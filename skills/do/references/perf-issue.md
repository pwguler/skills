# Perf issue

When: something is too slow or too costly, and it should get faster or cheaper.
Not when: the user asks to push one metric as far as it goes, round after round (hillclimb).

1. Write down the metric, the target (the user's, or one proposed and stated when the user gave none), and the command that measures it, before any change.
2. Measure a baseline on the current tree with that command, repeated enough times to show the spread, and keep the output.
3. Find where the cost goes by measuring it (a profile, a trace, timed sections), not by reading the code.
4. Run `implement` with the target as the criterion, one change per slice.
5. Measure each change with the command from step 2, and keep it only when the gain exceeds the baseline's spread.
6. Run `verify` on the claim about the number.

Done when: the command from step 2, run on the current tree, shows the target met by more than the baseline's spread.
