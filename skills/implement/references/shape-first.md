# Shape first

New code keeps the shape of its first draft, so settle that shape while it is still cheap to change: in call sites and signatures, before any logic exists.

1. Write two or three call sites of the new code, the way the acceptance criteria will exercise it.
2. Sketch two candidates that differ in structure, not in detail. Each is its types, its exported signatures, the data those types read, and the module each part lives in, with which module calls which.
3. Screen both against the design red flags in `drill`'s references, and keep the one that hides the most behind the smallest exported surface.
4. Write the winner into the code: its types, and its signatures with bodies that fail with `not implemented`. Export only what the call sites use. Each new type has one maker, the one function that builds its values, and its operations refuse a value that maker did not build.
5. Gate the sketch through `verify` and commit it alone. The commit body holds the call sites, sets the two candidates side by side, and says which won and why. The slices then fill each body test-first.

A change that adds one function and no type has no second candidate to weigh: its call site and its signature are the sketch.
