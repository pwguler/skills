# Refactoring

When: the task changes structure (names, modules, layering, types) and keeps every behavior a caller can see.
Not when: any caller-visible behavior changes (feature), or a bug is the reason for the change (bug-fix).

1. Write down the contract that must not move: the public names, inputs, outputs, errors, and side effects the change touches.
2. Name the tests that cover that contract, or say that none does; `implement` holds the change to them.
3. Run `drill` on the target shape.
4. Run `implement` on the plan drill settled.
5. Run `land` when the user picks a path.

Done when: every part of the contract from step 1 has a test covering it, every test from step 2 passes unchanged on the current tree, and no public name moved that the plan did not name.
