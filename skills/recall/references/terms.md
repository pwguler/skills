# Terms

`CONTEXT.md` is the project's glossary: the words people who know the domain use, each pinned to one meaning. It holds nothing else.

## Template

```md
# <Name of this context>

<What this part of the business does, in one or two sentences.>

## Language

**Appointment**:
A booked slot in which one Patient sees one Clinician.
_Avoid_: booking, visit, session

**Referral**:
A Clinician's request that a Patient be seen by another service.
_Avoid_: transfer, handoff

**Patient**:
A person the clinic treats.
_Avoid_: client, user, member

## Relationships

- A **Patient** has any number of **Appointments**; each **Appointment** has exactly one **Patient**
- A **Referral** leads to at most one **Appointment** in the other service

## Example dialogue

> **Dev:** "If a **Patient** misses an **Appointment**, does the **Referral** lapse?"
> **Clinician:** "No. The **Referral** stays open until the other service books it or it expires."

## Flagged ambiguities

- "visit" meant both a booked **Appointment** and the time actually spent in the room. Resolved: only **Appointment** is a term; time in the room is not tracked.
```

## Rules

- One word per concept. When the team uses several, choose one and move the rest to `_Avoid_`.
- Every ambiguity found gets a line under "Flagged ambiguities" with its ruling.
- A definition is one sentence and says what the thing is, not what the code does with it.
- Relationships put the terms in bold and state how many of each, when the count is known.
- Only words a domain expert would recognize. Retries, error classes, caches, and helpers stay out, however often the code uses them.
- Split `Language` under subheadings once clusters appear; a single list is fine until then.
- Include a short exchange, a dev asking and a domain expert answering, that uses the terms where they meet, so the edges between them show.

## One context or several

Most repos have one `CONTEXT.md` at the root.

A repo with several contexts keeps a `CONTEXT-MAP.md` at the root that lists each context's glossary and how the contexts talk:

```md
# Context Map

## Contexts

- [Scheduling](./services/scheduling/CONTEXT.md): books and moves appointments
- [Records](./services/records/CONTEXT.md): holds clinical notes and history
- [Payments](./services/payments/CONTEXT.md): charges patients and insurers

## Relationships

- **Scheduling → Records**: publishes `AppointmentCompleted`; Records opens a note from it
- **Records → Payments**: publishes `NoteSigned`; Payments raises the charge
- **Scheduling ↔ Payments**: share `PatientId`
```

Which one applies:

- `CONTEXT-MAP.md` exists: read it and work in the context the topic belongs to; ask when that is unclear.
- Only a root `CONTEXT.md` exists: there is one context.
- Neither exists: create a root `CONTEXT.md` when the first term is settled.
