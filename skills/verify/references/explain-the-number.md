# Explain the number

A measured number is a claim about what was measured. It is only as good as the explanation of what limits it. A speedup that comes from cache hits passes every check and means nothing. So does a one-time load that falls on the arm that ran first.

When: a claim depends on a measured number. Examples are a benchmark, a speedup, a latency, a size, a pass rate, or a run count.

- Name what limits the number: the CPU, the disk, the network, a lock, or the measurement setup itself. Show it with a measurement, not a guess.
- Rule out what else the number could measure. Examples are a warm cache, a one-time load or compile, arm order, a repeated input, and background load. When order can matter, alternate the arms, or run them in both orders.
- Measure both sides the same way: the same input, machine, build mode, and settings.
- Keep the run count, the spread, and the setup with the number. A difference smaller than the spread is no difference.
- Report the number with its unit, its run count, its spread, and what limits it.

Where it stops: verify decides when a claim needs evidence. This file decides what evidence a number needs. What to measure, and the target, belong to the plan of the work that measures it.
