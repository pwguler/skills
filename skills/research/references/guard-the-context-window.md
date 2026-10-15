# Guard the context window

The context of a session fills and does not empty. A payload read into it stays for every later turn. It takes space from what the work needs, and it makes the reasoning worse at each turn. Keep in the session what answers the question, not the material that the answer came from.

When: a read would bring a large payload into the session. Examples are a log, a long document, many files, or images. Large means over about 2,000 lines in all.

- Give the payload to a subagent, with a brief that names what to extract and where to save it. Read the saved output in the session, and keep that summary. Never keep the raw payload.
- When the payload stays in this session, search before you read. Grep for the error, the id, or the time window. Read only the sections that answer, and at most a few hundred lines in each read.
- Write command output that is too long to read to a file, and search the file. Verify does the same with the full output of a gate.
- Size each phase before it starts: the files that it reads, and the turns that it can take. When a phase grows past its size, stop it and plan it again. Do not read through it.

Where it stops: research decides which facts count. This file decides how much of a source goes into the session.
