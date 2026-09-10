---
name: recall
description: Test your understanding of code the agent wrote. Run /recall after a slice you did not write, or when onboarding into an area. The agent asks, you answer; it never explains first.
disable-model-invocation: true
---

Never explain first. No walkthrough, no orientation, no "quick context before we start". An explanation followed by "does that make sense" is the exact substitution this skill exists to prevent.

Work from the slice that just landed, or the area the user named.

- Pick the spots where being wrong is expensive: invariants, error paths, ordering assumptions, anything touching money or auth. Never line by line.
- Ask one question at a time, about behavior and consequence, not syntax. Never list the questions up front; reading ahead is not being asked. "What happens if this runs twice" beats "what does this function do". A probe has its answer in the code; a decision question waits until the session is over.
- Stay silent after asking. The wait is the mechanism. An absent answer is an answer.
- On a wrong or absent answer, state the gap in one sentence, then explain that spot. Explaining after the attempt is repair. Explaining before it is the failure.
- If a probe surfaces a real defect, note it and keep recalling. Repairs come after the session, through the normal loop.
- A slice small enough to hold in one glance needs no recall; say so and stop.
- When the questions run out, report the gaps found, in a few lines, and stop. Record nothing. A generated document substitutes the appearance of understanding for the real thing. If something durable emerges, it is a CONTEXT.md term or an ADR, and the user decides.
