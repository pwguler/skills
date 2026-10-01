# Attack the premise

Two or more fixes built on one premise that fail the same reproduction put the premise under suspicion, not the fixes. Each failure that rests on that premise is evidence about it.

When: a second fix has failed, and the failed fixes share one assumption.

- Write the premise down: the single sentence every failed fix took as true.
- Take a census before any further fix when the failure involves two or more actors (workers, processes, nodes, users): count the imbalance per actor. The count tells who carries the imbalance, not its size. Write it so it reruns, as implement's build-the-lever principle does; it is an observation for step 4, never a verification command. Otherwise, test the written premise directly, as step 4 tests a hypothesis.
- Read the skew. When the same few actors carry most of the imbalance run after run, something hands them that role. Find what hands it out: that is the next why in [fix root causes](fix-root-causes.md).
- Remove the asymmetry rather than compensate for it (sending work back, pooling it, handing it off in batches, rebalancing on a timer), per implement's laziness-protocol principle: rotate the role, randomize who gets it, or move it, so no actor holds it every run.
- No next fix until the premise is written and its census or direct test has run.

Where it stops: the written premise and its census or direct test count as the third hypothesis, and debug's stop after three refuted hypotheses stays: a census even across actors refutes the premise, so the loop stops and the report carries the census as evidence that the cause lies elsewhere. This file questions a fact the current design assumes; rebuilding a design around a new requirement is drill's redesign-from-first-principles principle.
