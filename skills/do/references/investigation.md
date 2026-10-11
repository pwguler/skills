# Investigation

When: the user asks how or why the code behaves as it does and wants an answer, not a change.
Not when: the behavior is wrong and has to change (bug-fix), or the facts live outside this repository (`research`).

1. Change nothing: no edits, no commits, no installs, and no writes to any database or service; a command only reads or runs what already exists.
2. Find the code that answers the question, and run what proves it when the run is read-only: a test, a script with no writes, a query against a local copy.
3. Answer each part of the question with the file and line it rests on, or the command and the output it printed.
4. Label any part the session could not confirm by reading or running as unverified, and name what would confirm it.

Done when: every claim in the answer carries a file and line, a command with its output, or the label unverified.
