# Make illegal states unrepresentable

Model domain truths in types so an invalid combination cannot be constructed. A bug class that the type checker rejects is a bug class that never ships.

- **Unions over flags.** A thing that is one of several states is a discriminated union, never a bundle of booleans. `status: 'draft' | 'paid' | 'refunded'`, not `isPaid` plus `isRefunded`, which admits the impossible both-true.
- **Brand the IDs.** `UserId` and `OrderId` are distinct types, not two `string`s that swap silently. The same for units: money, durations, and percentages carry their unit in the type.
- **Optional means absent is a real state.** A field is optional only when its absence is meaningful to the domain. A "required but not yet loaded" field belongs in a different state of the union, not in `?`.
- **Parse, don't validate.** Inbound data crosses the seam once, into a type that already guarantees the invariants. Inside the module, code trusts the type and checks nothing again. A `validate()` that returns the same untrusted shape has done nothing.
- **Exhaustive by construction.** Every switch over a union handles every case, and the compiler proves it. A new variant breaks the build at every site that must handle it; that is the point.
- **No escape hatches.** `any`, unchecked casts, and non-null assertions reintroduce the bug class the type was built to exclude. Each one is a defect until proven necessary and commented.

The test: can a wrong value be constructed at all? If yes, the type is describing the data's shape, not its truth.
