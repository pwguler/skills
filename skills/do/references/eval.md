# Eval

When: the question is whether a change to a skill, a prompt, or an instruction file changes how agents behave.
Not when: the work is writing that change (`write-skill`).

1. Before any run, write down the scenario, the behavior that counts as a pass, the arms (without and with the change), the runs per arm, and the bar the arm with the change must clear.
2. Build the arms so they differ only in the change: the same fixture, model, prompt, and harness settings, each run in a fresh session.
3. Run every arm the planned number of times, and keep each transcript.
4. Score each run against the pass from step 1 the way `write-skill` scores its re-run.
5. Run `verify` on the claim about the counts.
6. Report each arm's count against the bar exactly as step 1 wrote it, with where the transcripts are kept.

Done when: the report says whether the bar from step 1 was met, judged by that bar and no other.
