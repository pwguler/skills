# Naming and cohesion

A module is cohesive when it has one reason to change, and its name says what that reason is, in the domain's own words.

- **One reason to change per module.** If two unrelated stakeholders could each demand a change to the same module, it is two modules wearing one name. Split along the reason, not along the layer.
- **Names come from CONTEXT.md.** A module is named for the domain concept it owns, in the project's ubiquitous language. A name the glossary does not contain is either a missing glossary entry or a module that does not own a concept.
- **No dumping grounds.** `utils/`, `helpers/`, `common/`, `misc/`, and `shared/` are where cohesion goes to die: they collect whatever had no home. Every function belongs to the module whose concept it serves; if none does, that concept is missing.
- **No role suffixes.** `Manager`, `Handler`, `Service`, `Processor`, and `Helper` describe a shape, not a responsibility, and they hide that the module does not know what it owns. Name the thing it does: `OrderIntake`, not `OrderService`.
- **Size is a smell, not a rule.** A long module is a prompt to look for a second reason to change, not a line limit to satisfy by splitting arbitrarily. Splitting a cohesive module to hit a number produces two shallow modules (LANGUAGE.md) from one deep one.
- **Match the neighbors.** Naming, structure, and idiom follow what the surrounding code already does. A locally consistent codebase beats a globally optimal one applied to a third of the files.

The test: say what the module is for in one sentence without "and". If you need "and", it has two reasons to change.
