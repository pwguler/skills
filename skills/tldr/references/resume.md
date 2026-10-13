# Resume / Catch-up

Catch the user up since their last human message in this session. Notifications and subagent results are not their messages. Assume they remember that message and nothing after it. Write in plain words: short sentences, no jargon, no restating their last message back to them.

Keep the turn read-only except for visuals built from what you already have. Do not change code, start apps, or post anything to manufacture status.

## Gather

Collect work since that message: your own steps that changed outcomes, subagent reports, and other humans in the chat. Check current state of each PR, CI run, or background job this session touched. Say which are still running and which you could not check.

An action item is only a decision or step the user must take (product choice, approval, irreversible action, access you lack). Work you can still do yourself is not an action item. Include open action items raised before their last message if they still wait.

When rebuilding working context (resume), also skim the shared record that owns current state: recent commits and PRs, open tickets this session named, and live git status. Cap the brief; cite real ids.

## Reply shape

1. One sentence: how many action items, or none. If nothing happened and nothing waits, say so and stop.
2. What happened, most important first. Results and meaning, not tool narration. Name leftover self-work in one line each.
3. Each action item: the decision, why now, options and cost, recommendation, what happens if they stay silent. Link detail when it exists; write enough that they can decide without opening it.
4. One small visual when it clarifies a choice (table, before/after, Mermaid). Never invent numbers or screenshots you did not capture.

Call PRs, branches, and agents by names the user would know, not labels invented mid-run.
