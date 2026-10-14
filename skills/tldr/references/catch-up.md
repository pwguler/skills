# Catch-up

The user asks what happened since their last message in this session. Assume they remember that message and nothing after it. Their last message is the last thing they typed before asking; notifications and subagent reports do not count.

The reply only reads. Do not edit code, start apps, or post anything to produce status.

## Gather

- Everything since their last message that changed an outcome: your own steps, subagent results, other people's messages in the session.
- The live state of every PR, CI run, and background job the session touched. Name the ones still running and the ones you could not check.

An action item waits on the user and nobody else: a product choice, an approval, an action that cannot be undone, access you lack. Anything you can still finish yourself stays off that list. An action item raised before their last message counts while it still waits.

## Reply

1. One sentence with the number of action items, or none. When nothing happened and nothing waits, say that and stop.
2. What happened, most important first, as results and what they mean. Leftover work you still own gets one line each.
3. Each action item: the decision, why it matters now, the options with their cost, your recommendation, and the outcome when no answer comes. Give enough that the user can decide without opening a link.
4. At most one small visual, built to [visual.md](visual.md), when it makes a choice clearer. Never invent a number or a screenshot.

Name PRs, branches, and agents the way the user knows them, never by a label coined mid-run.
