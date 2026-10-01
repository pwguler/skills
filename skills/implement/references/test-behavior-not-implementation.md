# Test behavior, not implementation

A test drives the code the way its callers do and compares what they would observe to a value written out literally in the test. A test no defect can turn red spends run time and review attention and guards nothing.

When: a test's assertion does not plainly compare the subject's output with a literal value.

- The seam is the one step 3 names, the interface; this file governs what the assertion reads once the test stands there.
- Asserting which calls the code made, or repeating a constant the code holds, observes no behavior; neither counts as a test of it.
- Before a test is kept, picture every function it imports swapped for one that returns nothing. A test that stays green under that swap observes nothing: rewrite its assertion or delete it.
- An assertion that only checks a value exists, is truthy, has some type, did not throw, or is above zero fails the swap, and so does a test with no assertion at all.
- An assertion only that a mock was or was not called, or that a result is empty, missing, or unequal to one wrong value, fails the swap.
- An expected value produced by the code under test itself (the subject compared with its own output, or a parsed field compared with the builder that made it) fails the swap.
- An assertion that repeats a hand-kept constant, a config default, a table row, or a prompt string fails the swap.
- An assertion over data the test or its setup built, with the subject never called in the test body, fails the swap.
- The repair: run the subject inside the body of the test on one concrete input and compare its literal output or its visible effect, as a title given to a slug maker comes back as the exact slug.
- An absence is tested beside its opposite: the same test asserts the presence a second input produces.
- A constant is covered by running the code that reads it on one input, never by restating its value.
- A mock is judged by the payload it received or the state left behind, never by whether it ran.
- A test with no such assertion available is deleted.
- A test survives that checks a relation among a table's rows, such as a key two tables share or a parent row that exists, and so does a check the type checker runs at compile time.

Where it stops: this decides whether a test is kept; implement's red rule still decides whether a slice is done, and a kept test must pass both. Which failure modes get a test, and how many tests a change earns, stay with the rule on listing a slice's failure modes.
