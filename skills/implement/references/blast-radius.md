# Blast radius

The question is what the slice breaks outside its own diff, beyond the call sites a symbol search already lists.

1. State what the change now does, including behavior the diff implies but does not show.
2. Name the safety fact: the one claim that makes the change safe when it holds, for example "every reader of this column accepts null". Most of the risk hangs on it.
3. Search where the symbol index does not reach: serialized shapes (JSON, database columns, wire formats, files another process reads), configuration and feature flags, the dependency's own source at the version the lockfile pins, ordering at startup and teardown, and callers several hops away.
4. Grade the evidence for the safety fact and say which grade it reached:
   1. asserted;
   2. pointed at a `file:line`;
   3. traced through the failing case to the point where it cannot happen;
   4. checked by a script or test that runs the actual code and fails loudly when the fact is false;
   5. reproduced in the running app.
5. Give every risk left after step 3 a likelihood, a cost, and a `file:line`. When a search comes back empty, report it as empty; no caller is invented.

The slice commits once the safety fact reaches grade 4. Below grade 4, the commit message names the fact as unproven. The proof script becomes a regression test in this slice or is deleted before the commit. A fix the check reveals is a new slice, never an edit made inside this check.
