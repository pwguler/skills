# Type system discipline

Use the type checker as a proof tool that rules out impossible states, mixed-up primitives, and unhandled variants before the code runs. A case the types let a caller skip becomes a failure at runtime.

When: designing a type, reviewing a function signature, or writing any code a static type checker reads.

- Define errors and special cases out of existence rather than adding a handler for each one. Shapes that cannot hold a bad state, functions total over their input, and a redesigned interface are the tools.
- Make illegal states impossible to build. Model alternatives as a sum type, one tagged variant per case, never as a record of optional fields whose contradictory combinations still compile. A done flag next to an optional completion time admits "done, with no time"; derive the flag from the time alone, or give "open" and "done at a time" a variant each. A bug that raises the question "can this combination really happen?" means the type is too loose.
- Construct a type from the values it should hold rather than restricting a wider type with runtime checks. A non-empty list is a first element plus the rest, not a list whose length someone checks; a well-formed interval is its opening moment plus how long it lasts, not two moments someone keeps in order by hand. No representation is the privileged one: pick the shape that cannot express the illegal value, then offer callers the interface they need on top of it.
- Give primitives with different meanings different types. A user id and an order id are both strings underneath and never interchangeable: wrap each in its own named type, check it once where it is created, and trust it from there on.
- Data from outside is untyped until parsed: network payloads, serialized text, messages between processes, command-line arguments, config files, environment variables, database rows. Every such edge has a parse function that turns raw input into the typed model; [boundary-discipline](boundary-discipline.md) places it.
- Never tell the compiler something it cannot check. A cast, an unchecked coercion, or an assertion that silences the checker is a runtime crash waiting; prove the fact instead by validating, narrowing, or refining the model. This is the implement rule of no escape hatches, applied.
- Make exhaustiveness the compiler's job: a match over a sum type fails to compile when a new variant arrives unhandled. Use whatever check the language offers for that.
- When an authoritative schema already defines a shape (an interface definition file, an API schema, a database migration, a design-token file), derive the type from it rather than writing a parallel one by hand. The encode-lessons-in-structure principle in write-skill carries the same idea past types.
- Strengthen a type only where partiality shows up. A runtime assertion, an absence check, or a "cannot happen" throw marks the spot where a type is too weak: move that check into the type, then stop. A type exists to record which cases every caller has to cover; describing the data with maximum precision is not its job. Favor total functions: summing no numbers gives zero, so the sum accepts any list; taking the first element of nothing has no answer, so that operation accepts only a non-empty list.
- Checks to run on a type:
  - A comment explaining when a combination of fields is valid means the type admits too much; break it into variants.
  - Two arguments of one primitive type with different meanings get their own types.
  - Every cast, unchecked value, or forced non-absence traces back to an edge, and the validation moves there.
  - Adding a variant next month makes the compiler point at every place that needs a new case.
  - A type that copies a shape another file owns is derived from that file instead.
  - A type made stronger only for precision, where nothing would otherwise fail, goes back to the plain type.

Where it stops: this file deepens "Type-safe with no escape hatches" in implement; where outside data gets checked belongs to [boundary-discipline](boundary-discipline.md), and how domain rules become structures belongs to [model-the-domain](model-the-domain.md). In code no static checker reads, the same shapes still guide the design, and the parse at the edge carries the guarantees the compiler would.
