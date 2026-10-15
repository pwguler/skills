# Test behavior, not implementation

Each test states a promise that the code makes to its users. Users are callers, people, and other services. Behavior is what a user can observe: return values, errors, state that the user can read again, and outside effects. An outside effect is a sent request, a stored row, or a published message. Implementation is the rest: private helpers, the order of internal calls, data between steps, and which module did the work.

When: you add, change, or keep a test.

- The test uses the interface that step 3 names. This file tells what the assertion reads at that interface.
- Make two imagined edits to the code under each test:
  - First edit: break the behavior. Give a wrong result, drop an effect, or repeat an effect. After this edit, a good test fails.
  - Second edit: rebuild the internals, and keep every observable result. After this edit, a good test still passes. A test that fails here depends on the implementation, so every refactor breaks it.
- A test that still passes after the first edit usually has one of these faults:
  - its assertion promises less than the contract;
  - the code under test produced the expected value;
  - it restates a constant, a default, or a prompt, and no code that uses that value runs;
  - it asserts on data that the test made, not on what the subject did.
- Keep each test that fails after the first edit and passes after the second. Rewrite or delete the others.
- Drive the subject through the interface that its users have, with one concrete input. Write the expected value from the requirement, never from output that the code printed. Assert exactly what the contract promises.
- Let the contract choose the assertion. Example: the promise is "a closed account gets no email". Then "the mailer received no message" is behavior. Add a second case where the mailer gets a message. That case proves that the test can detect a send.
- A mocked outside service observes its payload, so the payload is behavior. No user observes a call to an internal helper, so that call is implementation.
- Assert an empty list only when no record matches. When records must come back, assert the exact records, not only that the list is not empty.
- An exact error message ties the test to text that no caller reads. Callers branch on the error type, so the type is the contract.
- Some tests hold an invariant, not a call: a key that two tables must share, or a compile-time type check. Such an invariant is behavior too.

Where it stops: this file decides whether you keep a test. The implement rule that tests must fail first still decides whether a slice is done. A kept test must meet both edits above, and that rule too. The implement rule on failure modes decides which failure modes get a test. It also decides how many tests a change needs.
