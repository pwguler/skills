# Type system discipline

Use the type checker as a proof tool. It rules out impossible states, mixed-up primitives, and unhandled variants before the code runs. A case that the types let a caller skip becomes a failure at runtime.

When: you design a type or a signature.

- Define errors and special cases out of existence, instead of adding a handler for each one. The tools are shapes that cannot hold a bad state, functions total over their input, and a redesigned interface.
- Make illegal states impossible to build. Model alternatives as a sum type, with one tagged variant for each case. Do not use a record of optional fields whose contradictory combinations still compile. A done flag next to an optional completion time allows "done, with no time". Derive the flag from the time alone, or give "open" and "done at a time" one variant each. A bug that asks "can this combination really happen?" shows that the type is too loose.
- Build a type from its legal values, instead of restricting a wider type with runtime checks. A non-empty list is a first element plus the rest, not a list whose length someone checks. A well-formed interval is its start time plus its length, not two times that someone keeps in order by hand. No representation has priority. Pick the shape that cannot express the illegal value. Then give callers the interface that they need on top of it.
- Give primitives with different meanings different types. A user id and an order id are both strings, but one can never replace the other. Wrap each one in its own named type. Check it once where you create it, and trust it after that.
- Data from outside has no type until you parse it. Examples are network payloads, serialized text, messages between processes, command-line arguments, config files, environment variables, and database rows. Each such boundary has a parse function that changes raw input into the typed model. [Boundary-discipline](boundary-discipline.md) places it.
- Never tell the compiler something that it cannot check. A cast, an unchecked coercion, or an assertion that stops the checker is a future runtime crash. Prove the fact instead: validate, narrow, or refine the model. This applies the implement rule against casts and other ways around the type checker.
- Make exhaustiveness the job of the compiler. A match over a sum type must fail to compile when a new variant arrives with no case. Use the check that the language offers for that.
- When an authoritative schema already defines a shape, derive the type from it. Do not write a second type by hand. Examples are an interface definition file, an API schema, a database migration, and a design-token file. The encode-lessons-in-structure principle in write-skill applies the same idea beyond types.
- Make a type stronger only where partiality shows. A runtime assertion, an absence check, or a "cannot happen" throw marks a type that is too weak. Move that check into the type, then stop. A type records which cases every caller must cover. Its job is not to describe the data with maximum precision.
- Prefer total functions. The sum of no numbers is zero, so the sum accepts any list. The first element of nothing has no answer, so that operation accepts only a non-empty list.
- Checks to run on a type:
  - A comment that tells which combinations of fields are legal shows that the type allows too much. Break it into variants.
  - Two arguments of one primitive type with different meanings get their own types.
  - Every cast, unchecked value, or forced non-absence comes from a boundary. Move the validation there.
  - When you add a variant next month, the compiler points at every place that needs a new case.
  - A type that copies a shape that another file owns is derived from that file.
  - A type that you made stronger only for precision, where nothing would fail otherwise, goes back to the plain type.

Where it stops: this file adds detail to the implement rule on type safety. Where to check outside data belongs to [boundary-discipline](boundary-discipline.md). How domain rules become structures belongs to [model-the-domain](model-the-domain.md). In code that no static checker reads, the same shapes still guide the design. There, the parse at the boundary gives the guarantees that the compiler would give.
