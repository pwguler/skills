# Exhaust the design space

A decision with no example in the codebase settles only after a comparison. Build or sketch two or three concrete alternatives, and compare them side by side. Three options cost less to explore than the wrong option costs to build.

When: there is nothing in the codebase to copy, and the decision is one of these. It is a new UI interaction, or an architectural choice with more than one possible shape. Or it is a product decision that depends on feel more than on logic.

- Make each alternative concrete: a sketch, a data shape, a call site, or a prototype. A name alone is not an alternative.
- Each alternative has its own shape. The first idea with different parameters is the same alternative. Design the solution twice. Start the second design from the requirements, not from the first design.
- Compare the alternatives on the same trade-offs, side by side. Put your choice first, as step 5 asks.
- Send a decision that depends on feel to the prototype skill, as step 5 says.
- Commit to nothing until the comparison is complete.
- When a new requirement comes into an existing design, one alternative is the new design from [redesign from first principles](redesign-from-first-principles.md). When the decision is about what the consumer gets, weigh it with [experience first](experience-first.md).

Where it stops: some decisions need no built alternatives. Examples are established patterns, bug fixes or refactors with a clear target, and constraints that leave only one approach. For these, the step 5 comparison stays in text. It names the pattern or the constraint that settles the decision. A request with no real decision takes the drill fast path. The prototype skill builds alternatives for look and flow. This file decides when alternatives are necessary.
