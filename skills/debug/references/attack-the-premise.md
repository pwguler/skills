# Attack the premise

Two or more fixes can share one premise and fail the same check. Then doubt the premise, not the fixes. Each failed fix is evidence against its premise. One more fix on the same premise tests an idea that the evidence already argues against.

When: a second fix failed, and the failed fixes share one premise.

- Write the premise down: the one sentence that every failed fix took as true.
- Before the next fix, check the premise itself. Choose an observation whose result depends on whether the premise is true, and run it.
- Make that check a script that you can run again, as implement's build-the-lever principle does. The check is an observation for step 4, never a verification command.
- Study the pattern of the failures, not only their size. Look for a trait that the failures share and that the premise did not foresee.
- If the evidence refutes the premise, the cause is in another place. Stop the loop and report, as the last paragraph says.
- If the evidence supports the premise, ask the next "why", as [fix root causes](fix-root-causes.md) says. The earlier fixes may have treated an effect of the cause.
- Sometimes the evidence shows that one worker, node, or user always gets most of the failures. Find the rule that selects it, and change that rule. For example, rotate the selection, or make it random. This follows implement's laziness-protocol principle.
- Do not add a step that cleans up after such failures. That step keeps the cause, and it adds work to every run.
- Do not start the next fix until the premise is written down and tested.

Where it stops: the written premise and its test count as the third hypothesis. The debug stop after three refuted hypotheses stays. When the test refutes the premise, the loop stops. The report gives the test result as evidence that the cause is in another place. This file questions a fact that the current design assumes. To rebuild a design around a new requirement, use drill's redesign-from-first-principles principle.
