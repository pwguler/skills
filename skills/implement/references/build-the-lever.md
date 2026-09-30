# Build the lever

Where work follows a recipe, the recipe becomes a tool, and the tool does the work. The tool applies the work identically on every run, reruns for free, and gives a reviewer one file to read in place of a pile of hand edits that only redoing them could recheck.

When: the work applies one recipe across files, records, or runs, or produces files or answers a tool could produce; the bar is triviality, not repetition, so a one-off migration earns a tool too.

- Build the lever by default. Skip it only for a couple of obvious edits a glance takes in whole.
- Work the first unit by hand to learn how it goes, then write the tool. Rerun it on that unit and diff the result against the hand-made version. Make it safe to run twice.
- A codemod or script makes edits, a generator writes repetitive files, and a query over the data answers an analysis.
- A task done once still merits a tool when the tool is what lets a reviewer see how it was done.
- A deterministic tool beats fanning out: when it covers every unit in one pass, run it in this session rather than dispatching subagents to apply by hand what it applies.
- When the work does fan out to subagents, write the lever as one brief every delegate reads: the recipe, the check each unit passes, and the files it must not touch. Keep that brief outside every delegate's write scope so no delegate can quietly rewrite its own contract.
- Citing this rule produces a file. With no codemod, script, generator, or delegate brief in the diff, the rule was not applied.
- The lever ships in the diff when the work outlives the session.
- Build the smallest tool that does or shows the job, never a framework, per [laziness protocol](laziness-protocol.md).

Where it stops: a script that covers every unit is one slice. The code a slice writes for new behavior follows implement's steps 3 to 5; a lever carries the mechanical work around that code and never takes the place of its failing test. The lever does or shows the work and never proves it: `verify` rejects a script written on the same branch as the change as a verification command, so the gate stays the project's test runner, build, and linter. Turning an instruction that keeps recurring into a lasting check is write-skill's encode-lessons-in-structure principle, not this one.
