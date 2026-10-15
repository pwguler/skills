# Attack the premise

Two or more fixes can rest on one premise and fail the same reproduction. Then suspect the premise, not the fixes. Each failure that rests on the premise is evidence about it.

When: a second fix failed, and the failed fixes share one assumption.

- Write the premise down: the one sentence that every failed fix took as true.
- When the failure involves two or more actors, count the imbalance for each actor before the next fix. Actors are workers, processes, nodes, or users.
- The count shows which actors have the imbalance, not its size. Write the count as a script that you can run again, as implement's build-the-lever principle does. The count is an observation for step 4. It is never a verification command.
- With only one actor, test the written premise directly, as step 4 tests a hypothesis.
- Look at how the imbalance is spread. If the same few actors have most of it in every run, something gives them that role. Find what gives the role. That is the next "why" in [fix root causes](fix-root-causes.md).
- Remove the asymmetry. Do not compensate for it by sending work back, pooling it, batching it, or rebalancing on a timer. This follows implement's laziness-protocol principle. Rotate the role, give it at random, or move it, so that no actor has it in every run.
- Do not make the next fix until the premise is written and its count or direct test has run.

Where it stops: the written premise, with its count or its direct test, is the third hypothesis. The debug stop after three refuted hypotheses stays. An even count across the actors refutes the premise. Then the loop stops, and the report gives the count as evidence that the cause is in another place. This file questions a fact that the current design assumes. To rebuild a design around a new requirement, use drill's redesign-from-first-principles principle.
