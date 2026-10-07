# Guard the context window

A session's context fills and does not empty: a payload read into it stays for every later turn, crowds out what the work needs, and leaves the reasoning worse at each one. The session keeps what answers the question, not the material the answer came from.

When: a read would bring a bulk payload into the session: a log, a long document, a large set of files, or images, over about 2,000 lines in all.

- Hand the payload to a subagent with a brief that names what to extract and where to save it. The session reads the saved output and keeps that summary, never the raw payload.
- Without a subagent, search before reading: grep for the error, the id, or the time window, and read only the sections that answer, a few hundred lines per read at most.
- Command output too long to read goes to a file and gets searched, the way verify keeps a gate's full output.
- Size each phase before it starts: the files it reads and the turns it may take. A phase that outgrows its size stops and is planned again rather than read through.

Where it stops: research decides whose facts count; this file decides how much of a source enters the session.
