# Prove It Works

Check the real artifact, not a proxy. A green suite, a compile, a cached screenshot, a file mtime, or the implementer's word is not the thing under claim. Run the feature, read the value, inspect the diff, and keep that output as evidence.

When a check fails, suspect the observation method before suspecting the system: wrong port, stale build, reading a derived view, or a health check that passes while init is still running.

Prefer a deterministic script that re-runs the same comparison over a one-time eyeball. Write the script, run it, and keep its output where a reviewer can re-run it. Commit the trail only when the work is large enough that the trail itself must stay auditable.
