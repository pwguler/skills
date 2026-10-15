# Measurement

A speed number tells what the measurement did, and that is not always what the code does. Check each number before you trust it, and before code changes because of it.

When: you record a baseline, compare two versions, or report a number about speed, memory, or size.

The spread of a measurement is its lowest and its highest run. The limiter is the one resource that stops the number from getting better.

## Before the first run

- Write the claim that you expect to make, in the words of the report. Example: "the report is 40% faster on 20,000 events, median of seven runs". The checks below test that sentence.
- Open the script that takes the measurement. Note what it times, what it counts, and what it leaves out.
- Check how busy the machine is with `uptime`, and count its cores with `nproc`. When the machine is busy and you cannot stop the load, alternate the sides. Then both sides meet the same noise. Say so in the report.

## The checks

1. **What is the limiter?** It can be a core, the disk, the network, a lock, or memory. It can also be the load generator itself. Find it with a profiler, the CPU use of each process (`top`, `pidstat`), or system call counts (`strace -c`). Check the I/O wait too. When a change does not move the number, the limiter is in another place.
2. **Is it set up like production?** Use release builds, production settings, the same versions and data, and caches as warm as production has them. When one side runs with default settings, you compared settings, not code. Fix the settings, and measure again before you choose. When you cannot fix them, choose no winner from that run.
3. **Is it possible?** Check the result against hard ceilings. Compare the transfer rate with what the disk and the network can carry, and the operation rate with the cores. A part that uses 10% of the time saves at most 10% of the time when you remove it. A result above such a ceiling measured something else: a cache, skipped work, or a bug.
4. **Did it fail?** Count the errors and the responses that are not a success. Check that each output is correct, not only that it exists. A rejected request is often fast, and a retry or a timeout is slow.
5. **Does it repeat?** Run each side five times or more, in alternating order, so that warm-up, lazy setup, and caches help neither side. Report the median and the spread. When the difference is smaller than the spread, you cannot measure a difference.
6. **Does the user feel it?** Next to a small benchmark, measure the whole path that a user waits for, with real data sizes. Give the small result as a fraction of the whole path. A function that takes 1% of a request can save at most 1% of it.
7. **Did the work happen?** Confirm that the timed code really did the work. The request reached the server, the rows exist, and the code read the result. Some code delays its work until something needs the result. When nothing does, the work never runs. Examples are a generator that nobody reads, a promise that nobody awaits, and a result that the compiler removes.

## Report

- First give the verdict. It is one of four: faster, slower, no difference that you can measure, or inconclusive.
- State the number with its unit, how many runs each side had, the spread, and the limiter. Example: "41 ms after, median of seven runs, spread 38 to 45 ms, limited by one core".
- The verdict is inconclusive when the limiter is unknown, or when one side ran with default settings. It is also inconclusive when checks 4 and 7 did not run. Name the missing part.
- A single run is fine when the user asked only for a rough figure. Say that it is one run, and still do checks 4 and 7. A choice between two options always gets every check.
