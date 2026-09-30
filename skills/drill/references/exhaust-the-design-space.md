# Exhaust the design space

A decision with no precedent in the codebase settles only after two or three concrete alternatives are built or sketched and compared side by side. Exploring three options costs less than building the wrong one.

When: a novel UI interaction, an architectural choice with more than one viable shape, or a product decision whose outcome turns on feel rather than logic, with nothing in the codebase to copy.

- Make each alternative concrete: a sketch, a data shape, a call site, or a prototype, never only a name.
- Each alternative takes its own shape. The first idea with other parameters is the same alternative; this is designing it twice, and the second design starts from a blank page.
- Compare them against the same trade-offs, side by side, and lead with the pick, as step 5 asks.
- A fork that turns on feel goes to the prototype skill, per step 5.
- Commit to nothing until the comparison is done.
- When a new requirement lands in an existing design, one alternative is the blank-page shape from [redesign from first principles](redesign-from-first-principles.md). When the fork is about what the consumer gets, weigh it by [experience first](experience-first.md).

Where it stops: an established pattern, a bug fix or refactor with a clear target, or constraints that leave one viable approach need no built alternatives; step 5's comparison stays in prose and names the pattern or constraint that settles it, and an ask with no real fork takes drill's fast path. The prototype skill builds alternatives for look and flow; this file decides when they are needed.
