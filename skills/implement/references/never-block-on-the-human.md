# Never block on the human

Stop the work for the user only when the answer of the user is what is missing. When a command can settle a decision, let the command settle it. A question about it stops the work, and a guess ships a choice that nobody checked.

When: a slice reaches a choice that the spec and the code leave open.

- A decision is for the user when one of these is true:
  - It changes an acceptance criterion, a non-goal, or a public interface. A public interface is an export, a parameter, a return value, or a method that code outside the change calls.
  - It needs the authority of the user: spending, access, or policy.
  - It cannot be undone: a force-push, deleted data, or a message sent outside the repo.
- A decision for the user stops the work. Name it, show the options with a recommendation, and wait for the answer. To build one option and ask afterwards is a guess.
- A spec can define an interface and also have a criterion that the interface cannot meet. That is a decision for the user, even when one more method would satisfy both. The added method is the interface change. The criteria do not rank above the interface that the spec wrote down.
- Settle every other decision that a run can answer by running it. Examples are which approach is faster, whether a call works, and which library handles the case. Measure or try each option, and pick one. Report what ran, what it showed, and the pick.
- A choice of taste with no criterion behind it follows the code around it. Name the choice in the report.
- Flag a problem outside the slice for a later round. Do not fix it in this one.

Where it stops: drill settles decisions before implementation starts. This file covers the decisions that a slice finds.
