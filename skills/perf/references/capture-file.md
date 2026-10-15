# Capture file

Diagnose from a capture that exists already. It can be a CPU profile, a trace, a heap snapshot, a thread dump, or a log. The file is fixed data. Read it, and do not run the program again to get a new one.

When: the user gives or names a profile, trace, dump, or log file.

1. Identify the format, and open it with a tool that can parse it. Examples are DevTools for a `.cpuprofile` or a trace `.json`, and `go tool pprof` for a pprof file. A text editor is enough for a thread dump.
2. Before you read the data, put it into a form that you can query. Examples are rows in sqlite, or a JSON file of samples, frames, or nodes. Write the conversion as a script, as implement's build-the-lever principle says. Keep the script outside the repository, because a diagnosis changes no files.
3. Query the converted data in the session. A raw file too large to read in the session goes to a subagent, as research's guard-the-context-window principle says.
4. Find the cause. Query for the frames with the most time, and follow the call tree to the slow path. For a leak, follow the references from the leaked object to its root. For a thread dump, find the thread that runs or waits, and why.
5. Map the slow frame to the file, the function, and the line, with the symbols in the file. A frame without a source location is not a diagnosis yet. Resolve its symbols, or say that the file does not have them.
6. When you have a capture from before and one from after, compare them to confirm the cause. Otherwise, call the finding the best explanation that the file supports, not a proven cause.

Report a diagnosis, not a fix. Give the file and its format, the reduced finding, the source location, and whether a second capture confirmed it. Change no code unless the user asks. When the user asks for a fix, a speed fix starts at step 2 of the perf skill. A defect, such as a deadlock, goes to `debug`.
