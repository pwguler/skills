# Terms

`CONTEXT.md` is the glossary of the project. It holds the words that domain experts use, and each word has one meaning. It holds nothing else.

## Template

```md
# <Name of this context>

<What this part of the business does, in one or two sentences.>

## Language

**Appointment**:
A booked slot in which one Patient sees one Clinician.
_Avoid_: booking, visit, session

**Referral**:
A Clinician's request that another service sees a Patient.
_Avoid_: transfer, handoff

**Patient**:
A person the clinic treats.
_Avoid_: client, user, member

## Relationships

- A **Patient** has any number of **Appointments**; each **Appointment** has exactly one **Patient**
- A **Referral** leads to at most one **Appointment** in the other service

## Example dialogue

> **Dev:** "If a **Patient** misses an **Appointment**, does the **Referral** end?"
> **Clinician:** "No. The **Referral** stays open until the other service books it or it expires."

## Flagged ambiguities

- "visit" meant both a booked **Appointment** and the time in the room. Resolved: only **Appointment** is a term, and the clinic does not track time in the room.
```

## Rules

- Use one word for each concept. When the team uses several words, choose one, and move the others to `_Avoid_`.
- Write a line under "Flagged ambiguities" for each ambiguity that you find, with its ruling.
- A definition is one sentence. It says what the thing is, not what the code does with it.
- Relationships put the terms in bold. They state how many of each there are, when the count is known.
- Use only words that a domain expert knows. Leave out retries, error classes, caches, and helpers, also when the code uses them often.
- When groups of terms appear, split `Language` under subheadings. Until then, one list is enough.
- Include a short dialogue that uses the terms where they meet, so that the borders between them show. A developer asks, and a domain expert answers.

## One context or several

Most repos have one `CONTEXT.md` at the root.

A repo with several contexts has a `CONTEXT-MAP.md` at the root. It lists the glossary of each context, and how the contexts communicate:

```md
# Context Map

## Contexts

- [Scheduling](./services/scheduling/CONTEXT.md): books and moves appointments
- [Records](./services/records/CONTEXT.md): holds clinical notes and history
- [Payments](./services/payments/CONTEXT.md): charges patients and insurers

## Relationships

- **Scheduling → Records**: publishes `AppointmentCompleted`; Records opens a note from it
- **Records → Payments**: publishes `NoteSigned`; Payments makes the charge
- **Scheduling ↔ Payments**: share `PatientId`
```

Which one applies:

- `CONTEXT-MAP.md` exists: read it, and work in the context of the topic. Ask when that is not clear.
- Only a root `CONTEXT.md` exists: there is one context.
- Neither file exists: create a root `CONTEXT.md` when the first term is settled.
