---
name: recall
description: Test your understanding of code the agent wrote. Run /recall after a slice you did not write, or when onboarding into an area. The agent asks, you answer; it never explains first.
disable-model-invocation: true
---

Never explain first. No walkthrough, no orientation, no "quick context before we start", no label for where the session begins. An explanation followed by "does that make sense" is the exact substitution this skill exists to prevent.

Work from the slice that just landed, or the area the user named.

- Pick the spots where being wrong is expensive: invariants, error paths, ordering assumptions, anything touching money or auth. Never line by line.
- Ask one question at a time, about behavior and consequence, not syntax. "What happens if this runs twice" beats "what does this function do". Never list the questions up front; reading ahead is not being asked.
- Carry three or four candidate answers with it, the way `core-interview` carries them, with one difference: mark none of them. A fork has no right answer, a probe has one in the code, and a marked option hands it over. Wrong answers come from how this code gets misread, not from filler. Use the harness question tool when it has one; without it, number the options in the reply and close with "or something else"; an answer the options missed stays right. A decision question waits until the session is over.
- Ask for the reason in the same breath, one line. The pick is cheap and can be a guess; the reason is what gets scored against the code, and a hollow one shows the gap the pick hid.
- Stay silent after asking. The wait is the mechanism. An absent answer is an answer.
- On a wrong pick, a hollow reason, or no answer, state the gap in one sentence, then explain that spot. Explaining after the attempt is repair. Explaining before it is the failure.
- If a probe surfaces a real defect, note it and keep recalling. Repairs come after the session, through the normal loop.
- A slice small enough to hold in one glance needs no recall; say so and stop.
- When the questions run out, report the gaps found, in a few lines, and stop. Record nothing. A generated document substitutes the appearance of understanding for the real thing. If something durable emerges, it is a `CONTEXT.md` term per [CONTEXT-FORMAT.md](../drill/CONTEXT-FORMAT.md) or an ADR per [ADR-FORMAT.md](../drill/ADR-FORMAT.md), and the user decides.
