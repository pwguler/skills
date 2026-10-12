---
name: principle-exhaust-the-design-space
description: "Apply when a novel UI interaction, an architectural choice with more than one viable shape, or a product decision that turns on feel has nothing in the codebase to copy. Two or three concrete alternatives are built or sketched and compared side by side before it settles."
---

# Exhaust the design space

A decision with no precedent in the codebase settles only after two or three concrete alternatives are built or sketched and compared side by side. Exploring three options costs less than building the wrong one.

When: a novel UI interaction, an architectural choice with more than one viable shape, or a product decision whose outcome turns on feel rather than logic, with nothing in the codebase to copy.

- Make each alternative concrete: a sketch, a data shape, a call site, or a prototype, never only a name.
- Each alternative takes its own shape. The first idea with other parameters is the same alternative; this is designing it twice, and the second design starts from a blank page.
- Compare them against the same trade-offs, side by side, and lead with the pick, as `drill`'s step 5 asks.
- A fork that turns on feel goes to the prototype skill, per `drill`'s step 5.
- Commit to nothing until the comparison is done.
- When a new requirement lands in an existing design, one alternative is the blank-page shape from the `principle-redesign-from-first-principles` skill. When the fork is about what the consumer gets, weigh it by the `principle-experience-first` skill.

Where it stops: an established pattern, a bug fix or refactor with a clear target, or constraints that leave one viable approach need no built alternatives; `drill`'s step 5's comparison stays in prose and names the pattern or constraint that settles it, and an ask with no real fork takes drill's fast path. The prototype skill builds alternatives for look and flow; this principle decides when they are needed.
