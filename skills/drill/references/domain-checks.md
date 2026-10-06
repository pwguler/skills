# Domain checks

An interview that settles a plan in words the project does not use, or on claims the code contradicts, settles the wrong plan.

When: from drill's first question to its closing summary.

- **Hold the user to the glossary.** A word used against its `CONTEXT.md` meaning gets named at once: "the glossary says a Refund is X; you seem to mean Y. Which?"
- **Replace vague words.** A loose or overloaded word gets a precise candidate: "by 'user', do you mean the Account holder or the Operator? They differ."
- **Test with cases.** Where two concepts touch, pick a concrete case at their edge and ask what happens.
- **Check claims against the code.** When the user says how something works, look. Name any disagreement: "the code refunds whole Payments; you described partial refunds. Which is true?"
- **Write terms as they settle.** Update `CONTEXT.md` the moment a term is settled, not at the end. It is a glossary only: no plans, notes, or implementation choices. Format: [terms.md](terms.md).
- **Keep ADRs rare.** Offer one only for a decision that passes the three tests in [decision-record.md](decision-record.md): costly to undo, puzzling from the code, won against a real rival.

Where it stops: the questions themselves, one fork at a time, follow `core-interview`; this file decides only what each answer is checked against.
