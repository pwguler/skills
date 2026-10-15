# Build the lever

When work follows a recipe, make the recipe into a tool, and let the tool do the work. The tool does the same work on every run, and it runs again at no cost. A reviewer reads one file. A reviewer can check edits made by hand only by doing them again.

When: the work applies one recipe across files, database rows, or runs. Or it makes files or answers that a tool could make. The test is whether the work is trivial, not whether it repeats. A migration that happens once also gets a tool.

- Build the tool by default. Skip it only for one or two obvious edits that a reader sees in one look.
- Make the first unit by hand, so that you learn the work. Then write the tool. Run it on that unit again, and compare the result with the version made by hand. Make the tool safe to run twice.
- A codemod or a script makes edits. A generator writes repeated files. A query over the data answers an analysis.
- A task done once still needs a tool when the tool shows a reviewer how the work was done.
- A deterministic tool is better than many agents. When it covers every unit in one run, run it in this session. Do not send subagents to do by hand what the tool does.
- When subagents do the work, it goes through `parallel`. Then the tool is one brief that every subagent reads. It gives the recipe, the check that each unit must pass, and the files that the subagent must not touch. Keep the brief outside the write scope of every subagent, so that no subagent can change its own contract.
- This rule produces a file. If the diff has no codemod, script, generator, or subagent brief, the rule was not applied.
- The tool ships in the diff when the work continues after the session.
- Build the smallest tool that does or shows the job, never a framework, as [laziness protocol](laziness-protocol.md) says.

Where it stops: a script that covers every unit is one slice. The code that a slice writes for new behavior follows implement's steps 3 to 5. The tool does the mechanical work around that code. It never replaces the failing test of that code. The tool does or shows the work, but it never proves it. `verify` rejects a script written on the same branch as the change as a verification command. So the gate stays the test runner, the build, and the linter of the project. To change a repeated instruction into a lasting check, use write-skill's encode-lessons-in-structure principle.
