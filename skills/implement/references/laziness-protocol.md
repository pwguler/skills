# Laziness protocol

Get the most result from the least code and the fewest separate parts. Someone must maintain tomorrow every line and layer that you write today.

When: before you add a file, a layer, a dependency, or a parameter.

- When you must refactor or improve code, look first for what you can remove, then for what to add. [Subtract-before-you-add](subtract-before-you-add.md) sets the order of the two.
- The smallest change that solves the problem wins, as step 4 and the implement rule on diffs already demand.
- Keep call chains short. When one question about the code needs more than three files or layers to answer, make the path shorter. One interface that hides much real work is not a deep chain.
- Make each choice in one place. When the same decision occurs in several places, give it one owner. Give the other places its answer as a plain flag.
- When a task asks to pass one more value through types, schemas, pipelines, or similar layers, stop. Find a shorter route to the place that needs the value.
- Fix small design faults while they are small, before each one becomes a permanent coordination cost. Examples: a function that only passes its arguments on, a representation that escapes its owner, a decision made twice.
- The final check: a change is the wrong solution when it does one of these:
  - It makes one question about the code need more than three files or layers to answer.
  - It makes a choice that another place already makes.
  - It adds a function that only passes its arguments on.
  - It lets a representation escape its owner.

Where it stops: the four questions in implement decide whether to add anything. This file decides how little to add, and in what shape. Flag such a fault or a repeated choice outside the lines that the slice changes. Do not fix it: the implement rule on diffs forbids it. [Minimize reader load](minimize-reader-load.md) weighs the layers and hidden state that a reader must keep in mind.
