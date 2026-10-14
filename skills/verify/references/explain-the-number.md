# Explain the number

A measured number is a claim about what was measured, and it is only as good as the account of what bounds it. A speedup made of cache hits, or a one-time load landing on whichever arm ran first, passes every check and means nothing.

When: a claim rests on a measured number: a benchmark, a speedup, a latency, a size, a pass rate, or a count of runs.

- Name what bounds the number (the CPU, the disk, the network, a lock, the measuring setup itself), and show it with a measurement, not a guess.
- Rule out what else it could be measuring: a warm cache, a one-time load or compile, the order the arms ran in, a repeated input, background load. When order can matter, run the arms interleaved or in both orders.
- Measure both sides the same way: the same input, machine, build mode, and settings.
- Keep the run count, the spread, and the setup with the number. A difference smaller than the spread is no difference.
- Report the number with its unit, its run count, its spread, and what bounds it.

Where it stops: verify decides when a claim needs evidence; this file decides what evidence a number needs. What to measure, and the target, belong to the plan of the work that measures it.
