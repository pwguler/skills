# Laziness protocol

Get the most result out of the least code and the fewest moving parts. Every line and layer written today is one someone maintains tomorrow.

When: before adding a file, a layer, a dependency, or a parameter.

- Asked to refactor or improve, look for what can go before what can be added; [subtract-before-you-add](subtract-before-you-add.md) orders the two.
- The smallest change that solves the problem wins, as step 4 and the surgical-diff rule already demand.
- Keep call chains shallow. When answering one question about the code means following it through more than three files or layers, flatten the path. One interface that hides a lot of real work is not a deep chain.
- Make each choice in one place. When the same decision shows up in several spots, give it a single owner and hand everyone else its answer as a plain flag.
- When a task asks to thread one more value through types, schemas, pipelines, or layers like them, stop and find a shorter route to the place that needs it.
- Close small leaks while they are small, before each grows into a permanent coordination cost: a function that only passes its arguments on, a representation that escapes its owner, a decision made twice.
- The final check: a change is the wrong solution when it makes answering one question about the code take more than three files or layers, makes a choice already made elsewhere, adds a function that only passes its arguments on, or lets a representation escape its owner.

Where it stops: the ladder decides whether anything gets added at all; this file decides how little gets added and in what shape. A leak or repeated choice outside the lines the slice already changes is flagged, not fixed, under the surgical-diff rule. Layers and hidden state a reader must carry are weighed in more depth by [minimize-reader-load](minimize-reader-load.md).
