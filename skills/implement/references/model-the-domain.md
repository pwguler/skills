# Model the Domain

Encode the domain in a structure that deletes branches: a state machine, a typed union, a map keyed by the real cases, a reducer, or a module that owns one concept. Prefer that structure over another `if`/`else` or a pair of booleans that must stay in sync.

Do not invent an abstraction the domain does not have. Smell: a second place that repeats the same case list, or code organized by load-then-validate-then-save stages that each restate the same invariants.
