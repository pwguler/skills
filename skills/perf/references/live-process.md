# Live process

Diagnose a process while it runs. Its current state is the evidence, and a restart can destroy that state. Capture what the process does now. Do not guess from the source.

When: a running process is slow, uses too much CPU or memory, or hangs.

1. Before you change anything, capture a signal from the live process:
   - a CPU profile, for a process that uses a full core;
   - two or more heap snapshots, some time apart, for memory that grows;
   - thread or stack dumps, for a hang.
2. Use a tool that attaches to the running process. Do not restart it before the capture, because a restart clears the state that caused the problem.
   - Node: `kill -USR1 <pid>` opens the inspector. Then record a CPU profile or a heap snapshot in DevTools.
   - Python: `py-spy dump --pid <pid>` for the stacks, and `py-spy record --pid <pid>` for a profile.
   - JVM: `jstack <pid>`, or `jcmd <pid> Thread.print`.
   - Native code: `perf record -p <pid>`.
3. Some tools pause or slow the process: `gdb -p`, `strace -p`, and a heap snapshot. Ask the user before you use one on a process that other people use.
4. Reduce the capture to the cause. That is the function that holds the most time, or the chain of references that keeps leaked objects alive. For a hang, it is the blocked thread and what it waits for.
5. Prove the mechanism with a probe that does not restart the process. Examples are an expression in the inspector, a debugger breakpoint, and dynamic tracing such as `bpftrace`. A log line or a counter needs a code change and a restart, so use one only after the capture.
6. Map the finding to the source: the file, the function, and the line that allocates, loops, or waits.

Report a diagnosis, not a fix. Give the signal that you captured, the reduced finding, the proof, the source location, and the paths of the captures. Change no code unless the user asks. When the user asks for a fix, a speed fix starts at step 2 of the perf skill. A defect, such as a deadlock, goes to `debug`.
