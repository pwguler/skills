# Shape first

New code keeps the shape of its first draft. So settle that shape while it is still cheap to change: in call sites and signatures, before any logic exists.

1. Write two or three call sites of the new code, the way the acceptance criteria will exercise it.
2. Sketch two candidates that differ in structure, not in detail. Each candidate is its types, its exported signatures, the data that those types read, and the module for each part. Show which module calls which.
3. Check both candidates against the design red flags in the references of `drill`. Keep the candidate that hides the most behind the smallest exported interface.
4. Write the winner into the code: its types, and its signatures with bodies that fail with `not implemented`. Export only what the call sites use. Each new type has one maker: the one function that builds its values. The operations of the type refuse a value that its maker did not build.
5. Run the `verify` gate on the sketch, and commit it alone. The commit body holds the call sites and shows the two candidates side by side. It says which candidate won, and why. The slices then fill each body test-first.

A change that adds one function and no type has no second candidate to compare. Its call site and its signature are the sketch.
