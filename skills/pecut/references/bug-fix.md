# Bug fix

When: something that worked is broken: an error, a crash, a failing test, wrong output, or a regression.
Not when: the cause is already stated and the fix is a named edit, or the code was never meant to do this (feature).

1. Write down the surface the report names (the endpoint, command, page, or test) and what the user saw fail there.
2. Run `debug` on the failure.
3. Run `verify` with the surface from step 1 as the changed path.
4. Run `land`.

Done when: the failure from step 1 no longer occurs on that surface, shown by a command run on the current tree.
