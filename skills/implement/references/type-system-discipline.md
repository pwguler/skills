# Type System Discipline

Make illegal states unrepresentable. Construct valid values; do not carve them out of loose bags of fields after the fact. Brand primitives that mean different things. Parse at system boundaries and trust the typed value inside. No lying casts. Prefer exhaustive matches on unions. Strengthen types where partiality appears; do not paper over it with optionals everywhere.
