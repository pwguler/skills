# Laziness protocol

Get the most result out of the least code and the fewest moving parts. Every line and layer written today is one someone maintains tomorrow.

When: while shaping a change, sizing its diff, or feeling the pull toward a new abstraction, a new layer, or a value threaded through many places.

- Asked to refactor or improve, look for what can go before what can be added; [subtract-before-you-add](subtract-before-you-add.md) orders the two.
- The smallest change that solves the problem wins, as step 4 and the surgical-diff rule already demand. A few plain lines beat handsome boilerplate.
- Keep call chains shallow. When answering one question about the code means following it through more than three files or layers, flatten the path. One interface that hides a lot of real work is not a deep chain.
- Make each choice in one place. When the same decision shows up in several spots, give it a single owner and hand everyone else its answer as a plain flag.
- When a task asks to thread one more value through types, schemas, pipelines, or layers like them, stop and find a shorter route to the place that needs it.
- Close small leaks while they are small, before each grows into a permanent coordination cost: a function that only passes its arguments on, a representation that escapes its owner, a decision made twice.
- The final check: code a human maintainer would find tiring to keep alive is the wrong solution.

Where it stops: the ladder decides whether anything gets added at all; this file decides how little gets added and in what shape. A leak or repeated choice outside the lines the slice already changes is flagged, not fixed, under the surgical-diff rule. Layers and hidden state a reader must carry are weighed in more depth by [minimize-reader-load](minimize-reader-load.md).
