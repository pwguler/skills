# Coverage

Many slices of one job at once: a test sweep across packages, a check across every route, a migration across modules. Coverage costs one subagent per slice.

## Before launch

1. State the done check (what makes a slice finished) and the report to return.
2. Split the job into slices that share no files and no state.
3. State the count and the cost.
4. Every worker writes only its own outputs; a worker that edits files runs with `worktree: true`, and its edits reach this checkout only as the patch `parallel`'s step 5 applies. A brief that measures something names the exact commits and the method: the sample count, what one sample is, and the run order.

## Launch

Launch the slices as `worker` subagents in one `subagent` workflow call, as one `runs.all` batch. Every brief stands alone: the goal, the slice, how to check it, and what to report. Each worker reports one status (`PASS`, `ISSUES`, or `BLOCKED`) with its evidence, and names every issue it can prove rather than stopping at the first. A worker that fails to return is noted, and the rest go on.

## Report

A result that leaves out the commits or the method its brief named is dropped; that slice is launched once more, then recorded as a gap. A gap is never a pass. Return one compact table, one line per proven issue, and the gaps and dropouts by name. Raw worker output stays out of the report.
