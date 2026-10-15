# Test behavior, not implementation

A test runs the code the way its callers do. It compares what they would observe with a value written out literally in the test. A test that no defect can make fail costs run time and review attention, and it protects nothing.

When: the assertion of a test does not plainly compare the output of the subject with a literal value.

- The test uses the interface that step 3 names. This file tells what the assertion reads at that interface.
- An assertion on which calls the code made observes no behavior. An assertion that repeats a constant of the code observes no behavior either. Neither one tests the behavior.
- Before you keep a test, imagine that each function it imports returns nothing. A test that still passes after that change observes nothing. Rewrite its assertion or delete the test.
- These assertions fail that check:
  - An assertion that only checks that a value exists, is truthy, has a type, did not throw, or is positive. A test with no assertion also fails.
  - An assertion only that a mock was called or was not called.
  - An assertion only that a result is empty, missing, or not equal to one wrong value.
  - An expected value that the code under test made itself. Examples are the subject compared with its own output, or a parsed field compared with the builder that made it.
  - An assertion that repeats a constant kept by hand, a config default, a table row, or a prompt string.
  - An assertion over data that the test or its setup built, when the test body never calls the subject.
- The repair: run the subject in the body of the test on one concrete input. Compare its literal output or its visible effect. For example, give a title to a slug maker, and compare the result with the exact slug.
- Test an absence together with its opposite. The same test asserts the presence that a second input gives.
- Cover a constant by running the code that reads it on one input. Never cover it by stating its value again.
- Judge a mock by the payload that it received or the state that it left. Never judge it by whether it ran.
- Delete a test that has no such assertion available.
- Keep a test that checks a relation among table rows. Examples are a key that two tables share, or a parent row that exists. Keep also a check that the type checker does at compile time.

Where it stops: this file decides whether you keep a test. The implement rule that tests must fail first still decides whether a slice is done. A kept test must pass both. The implement rule on failure modes decides which failure modes get a test. It also decides how many tests a change needs.
