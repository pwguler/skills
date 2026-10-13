# Blast Radius

Before a commit you do not trust, find what else the change could break beyond the greppable callers, and prove the one safety fact by running code.

## Certainty ladder

For the fact the change is safe because of, get as far down this list as is cheap, and say where it stopped:

1. Said so.
2. Pointed at a real `file:line` (or the library's own source).
3. Walked the bad case and showed it cannot happen.
4. Ran a script or test that calls the real code and fails loud if wrong.
5. Reproduced in the running app.

Aim for step 4 or better. A writeup alone is not proof.

## Pass

1. Read the change, including behavior the diff does not spell out.
2. Name the one load-bearing safety fact. If it holds, most scary cases clear at once.
3. Look where grep stops: pinned library source and version, timing and teardown, wire or DB shapes, feature flags, code a few hops downstream.
4. For each remaining risk, give a real likelihood and cost. Cite `file:line`. A search that finds nothing is still an answer; never invent a caller.
5. Prove the one fact by running code. Paste the output.
6. Hand back: what it does, the one safety fact and proof level, confirmed risks, cleared cases, and the cheapest pre-merge check.

Edit nothing under blast-radius except a disposable proof script you remove or keep as a test. Product fixes go back through the normal slice loop.
