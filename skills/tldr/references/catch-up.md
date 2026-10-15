# Catch-up

The user asks what happened since their last message in this session. Assume that they remember that message and nothing after it. Their last message is the last thing that they typed before they asked. Notifications and subagent reports do not count.

The reply only reads. Do not edit code, start apps, or post anything to get the status.

## Gather

- Everything since their last message that changed an outcome. That is your steps, subagent results, and messages from other people in the session.
- The live state of every PR, CI run, and background job that the session touched. Name the ones that still run, and the ones that you could not check.

An action item waits for the user and nobody else. Examples are a product choice, an approval, an action that cannot be undone, or access that you do not have. Keep off that list anything that you can still finish yourself. An action item raised before their last message counts while it still waits.

## Reply

1. One sentence with the number of action items, or none. When nothing happened and nothing waits, say that and stop.
2. What happened, most important first, as results and what they mean. Give one line for each piece of work that you still own.
3. For each action item, give the decision and why it matters now. Give the options with their cost, your recommendation, and the result when no answer comes. Give enough that the user can decide without opening a link.
4. At most one small visual, built as [visual.md](visual.md) says, when it makes a choice clearer. Never invent a number or a screenshot.

Name PRs, branches, and agents with the names that the user knows. Never use a label that you made up during the run.
