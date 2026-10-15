---
name: core-interview
description: Internal support skill that runs the interview loop for other skills, until every decision is settled. Use it only when another skill or the user starts it, never on your own.
---

Question the user until the two of you agree on every part of the topic. Treat the topic as a decision tree. Settle each decision before the decisions that depend on it. Leave no branch open. Not every branch needs a question to the user. The code can settle it, or an assumption that the rules below allow.

Rules:

- Ask only questions whose answer would change what gets built. When your recommendation is strong and a wrong choice costs little, do not ask. Adopt the recommendation, record it as an assumption, and continue.
- Put one real decision at a time to the user, through the `ask_user_question` tool. Wait for its answer before you ask the next one. The options are your candidate answers, with the recommended answer first. Put low-risk clarifications together in one call.
- The user can always type an answer that the options do not have. So the tool never limits the choices of a decision.
- If the codebase can answer a question, look in the codebase. Do not ask the user. You find the facts, not the user. Look up a fact in this session before you ask the question that depends on it.
- When the user cannot describe the target behavior in words, ask for a reference implementation. That is source code whose behavior you reproduce, also in another language or library. Source code is better than a description or a screenshot.
- The final summary lists every assumption that you adopted. The user can then reject any of them in one reply. A rejected assumption opens only its own branch again.
