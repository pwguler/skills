# Blast radius

Find what the slice breaks outside its own diff, beyond the call sites that a symbol search already lists.

1. State what the change now does. Include behavior that the diff implies but does not show.
2. Name the safety fact: the one claim that makes the change safe when it is true. An example is "every reader of this column accepts null". Most of the risk depends on it.
3. Search where the symbol index does not reach:
   - serialized shapes: JSON, database columns, wire formats, and files that another process reads;
   - configuration and feature flags;
   - the source of the dependency, at the version that the lockfile pins;
   - the order of startup and shutdown;
   - callers several steps away.
4. Grade the evidence for the safety fact, and say which grade it reached:
   1. stated;
   2. pointed at a `file:line`;
   3. traced through the failing case to the point where it cannot happen;
   4. checked by a script or test that runs the actual code and fails loudly when the fact is false;
   5. reproduced in the running app.
5. Give each risk left after step 3 a likelihood, a cost, and a `file:line`. When a search finds nothing, report that it found nothing. Do not invent a caller.

The slice commits when the safety fact reaches grade 4. When it cannot reach grade 4, the slice still commits. Its commit message names the fact as unproven, and gives the grade that it reached. The proof script becomes a regression test in this slice, or you delete it before the commit. A fix that the check shows is a new slice. Never make that edit inside this check.
