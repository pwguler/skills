# Coverage

Coverage runs many parts of one job at once. Examples are a test sweep across packages, a check across every route, or a migration across modules. Coverage costs one subagent for each part.

## Before launch

1. State the done check, which tells when a part is finished, and the report to return.
2. Split the job into parts that share no files and no state.
3. State the count and the cost.
4. Every worker writes only its own outputs. A worker that edits files runs in its own git worktree. Its edits reach this checkout only through step 5 of `parallel`. A brief that measures something names the exact commits and the method. The method is the sample count, what one sample is, and the run order.

## Launch

Launch the parts as subagents, all at the same time. Each brief is complete alone: the goal, the part, how to check it, and what to report. Each worker reports one status, `PASS`, `ISSUES`, or `BLOCKED`, with its evidence. It names every issue that it can prove, and does not stop at the first one. Note a worker that does not return, and continue with the others.

## Report

Drop a result that leaves out the commits or the method that its brief named. Launch that part once more, then record it as a gap. A gap is never a pass. Return one short table, with one line for each proven issue. Name the gaps and the workers that did not return. Keep raw worker output out of the report.
